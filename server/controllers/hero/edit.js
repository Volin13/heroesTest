const ApiError = require("../../error/ApiError");
const {
  Hero,
  HeroCatchPhrase,
  HeroSuperpowers,
  HeroImages,
} = require("../../models/models");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const staticPath = path.resolve(__dirname, "..", "..", "static");

const saveImages = async (imageFiles, heroId) => {
  return Promise.all(
    imageFiles.map(async (image) => {
      const sideImgName = uuidv4() + ".jpg";
      await image.mv(path.join(staticPath, sideImgName));
      return HeroImages.create({ fileName: sideImgName, heroId });
    })
  );
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  const {
    real_name,
    nickname,
    sex,
    age,
    alignment,
    species,
    superpowers,
    oldImages,
    catch_phrases,
    height,
    weight,
    mainImg,
  } = req.body;

  try {
    const hero = await Hero.findOne({
      where: { id },
      include: [
        {
          model: HeroCatchPhrase,
          as: "catch_phrases",
        },
        {
          model: HeroSuperpowers,
          as: "hero_superpowers",
        },
        {
          model: HeroImages,
          as: "heroImages",
        },
      ],
    });
    if (!hero) {
      return next(ApiError.notFound("Hero not found"));
    }

    // Оновлення даних героя
    const heroData = {
      real_name,
      nickname,
      sex,
      age,
      alignment,
      species,
      height,
      weight,
    };

    await hero.update(heroData);

    // Парсинг даних
    const parsedSuperpowers = JSON.parse(superpowers || "[]");
    const parsedCatchPhrases = JSON.parse(catch_phrases || "[]");
    const parsedOldImages = JSON.parse(oldImages || "[]");

    const { mainImg } = req.files || {};
    if (mainImg && mainImg.size > 0) {
      // delete old mainImg
      const oldMainImg = path.join(staticPath, hero.mainImg);

      await fs.unlink(oldMainImg);

      // save new mainImg
      const fileName = uuidv4() + ".jpg";
      await mainImg.mv(path.join(staticPath, fileName));
      hero.mainImg = fileName;
      await hero.save();
    }

    // Обробка старих зображень
    const existingImages = await HeroImages.findAll({ where: { heroId: id } });

    if (parsedOldImages.length) {
      for (const existingImage of existingImages) {
        const exists = parsedOldImages.includes(
          existingImage.dataValues.fileName
        );
        if (!exists) {
          const imagePath = path.join(
            staticPath,
            existingImage.dataValues.fileName
          );

          await fs.unlink(imagePath);
          await existingImage.destroy();
        }
      }
    }

    // Додати нові зображення

    if (req.files) {
      const imageFiles = Object.keys(req.files)

        .filter((key) => key.startsWith("images["))
        .map((key) => req.files[key]);
      if (imageFiles.length) await saveImages(imageFiles, hero.id);
      // Оновлення суперсили
      if (parsedSuperpowers.length) {
        await HeroSuperpowers.destroy({ where: { heroId: id } });
        await Promise.all(
          parsedSuperpowers.map(({ title, description }) =>
            HeroSuperpowers.create({ heroId: id, title, description })
          )
        );
      }
    }

    // Оновлення фраз
    if (parsedCatchPhrases.length) {
      await HeroCatchPhrase.destroy({ where: { heroId: id } });
      await Promise.all(
        parsedCatchPhrases.map(({ title, description }) =>
          HeroCatchPhrase.create({ heroId: id, title, description })
        )
      );
    }

    return res.json({ message: "Hero updated successfully", hero });
  } catch (error) {
    return next(ApiError.badRequest("Error updating hero"));
  }
};

module.exports = edit;
