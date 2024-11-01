const fs = require("fs").promises;
const path = require("path");
const {
  Hero,
  HeroCatchPhrase,
  HeroSuperpowers,
  HeroImages,
} = require("../../models/models");
const ApiError = require("../../error/ApiError");

const deleteOne = async (req, res, next) => {
  const { id } = req.params;

  // Find the hero by ID
  const hero = await Hero.findOne({ where: { id: id } });
  if (!hero) {
    return next(ApiError.notFound("Hero not found"));
  }

  try {
    // Delete the hero's main image
    const mainImgPath = path.resolve(
      __dirname,
      "..",
      "..",
      "static",
      hero.mainImg
    );
    await fs.unlink(mainImgPath).catch((err) => {
      console.warn("Failed to delete main image:", err.message);
      return next(ApiError.internal("Failed to delete main image"));
    });

    // find all catch phrases, and side images of the hero
    const heroSuperpowers = await HeroSuperpowers.findAll({
      where: { heroId: id },
    });
    const heroCatchPhrases = await HeroCatchPhrase.findAll({
      where: { heroId: id },
    });
    const heroImages = await HeroImages.findAll({ where: { heroId: id } });

    // Use Promise.all to handle asynchronous deletion of related records and files
    await Promise.all([
      // Delete each superpower
      ...heroSuperpowers.map((power) => power.destroy()),
      // Delete each catch phrase
      ...heroCatchPhrases.map((phrase) => phrase.destroy()),
      // For each hero image, delete the file and remove
      ...heroImages.map(async (image) => {
        const imagePath = path.resolve(
          __dirname,
          "..",
          "..",
          "static",
          image.fileName
        );
        await fs.unlink(imagePath).catch((err) => {
          console.warn(
            `Failed to delete side image ${imagePath}:`,
            err.message
          );
        });
        return image.destroy();
      }),
    ]);
    // Delete the hero
    await hero.destroy();

    return res.json({ message: "Hero has been successfully deleted" });
  } catch (error) {
    console.error("Error during hero deletion:", error.message);
    return next(ApiError.internal("Error during hero deletion"));
  }
};

module.exports = deleteOne;
