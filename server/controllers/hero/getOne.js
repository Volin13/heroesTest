const ApiError = require("../../error/ApiError");
const {
  Hero,
  HeroCatchPhrase,
  HeroSuperpowers,
  HeroImages,
} = require("../../models/models");

const getOne = async (req, res, next) => {
  const { id } = req.params;

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

    return res.json(hero);
  } catch (e) {
    console.error("Error fetching hero:", e.message);
    return next(ApiError.internal("Error fetching hero"));
  }
};

module.exports = getOne;
