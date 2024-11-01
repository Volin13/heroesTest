const {
  Hero,
  HeroCatchPhrase,
  HeroSuperpowers,
  HeroImages,
} = require("../../models/models");
const ApiError = require("../../error/ApiError");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

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

const saveSuperpowers = async (superpowers, heroId) => {
  return Promise.all(
    superpowers.map((power) =>
      HeroSuperpowers.create({
        heroId,
        title: power.title,
        description: power.description,
      })
    )
  );
};

const saveCatchPhrases = async (catchPhrases, heroId) => {
  return Promise.all(
    catchPhrases.map((phrase) =>
      HeroCatchPhrase.create({
        heroId,
        title: phrase.title,
        description: phrase.description,
      })
    )
  );
};

const create = async (req, res, next) => {
  const {
    real_name,
    nickname,
    sex,
    age,
    alignment,
    species,
    superpowers,
    catch_phrases,
    origin_description,
    height,
    weight,
  } = req.body;

  const existingHero = await Hero.findOne({ where: { nickname: nickname } });
  if (existingHero) {
    return next(ApiError.conflict("This hero`s nickname is already used"));
  }

  const { mainImg } = req.files || {};
  if (!mainImg) return next(ApiError.badRequest("Main image is required"));

  const fileName = uuidv4() + ".jpg";

  try {
    await mainImg.mv(path.join(staticPath, fileName));
    const hero = await Hero.create({
      nickname,
      real_name,
      origin_description,
      sex,
      age,
      alignment,
      height,
      weight,
      species,
      mainImg: fileName,
    });
    const imageFiles = Object.keys(req.files)
      .filter((key) => key.startsWith("images["))
      .map((key) => req.files[key]);

    if (imageFiles.length) await saveImages(imageFiles, hero.id);
    if (superpowers) await saveSuperpowers(JSON.parse(superpowers), hero.id);
    if (catch_phrases)
      await saveCatchPhrases(JSON.parse(catch_phrases), hero.id);

    return res.json(hero);
  } catch (error) {
    console.error("Error creating hero:", error.message);
    return next(ApiError.internal("Error creating hero"));
  }
};

module.exports = create;
