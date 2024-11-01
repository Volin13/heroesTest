const { Hero } = require("../../models/models");
const ApiError = require("../../error/ApiError");

const getAll = async (req, res) => {
  // Parse limit and page values
  let { limit = 5, page = 1 } = req.query;
  limit = parseInt(limit, 10);
  page = parseInt(page, 10);
  const offset = (page - 1) * limit;

  try {
    // Fetch heroes with pagination and sorting
    const heroesData = await Hero.findAndCountAll({
      limit,
      offset,
    });

    const formattedHeroes = heroesData.rows.map((hero) => ({
      id: hero.dataValues.id,
      nickname: hero.dataValues.nickname,
      mainImageUrl: hero.dataValues.mainImg,
    }));

    // Return heroes data and total count
    return res.json({
      count: heroesData.count,
      rows: formattedHeroes,
      currentPage: page,
      totalPages: Math.ceil(heroesData.count / limit),
    });
  } catch (error) {
    console.error("Error fetching heroes:", error.message);
    return next(ApiError.internal("Error fetching heroes"));
  }
};

module.exports = getAll;
