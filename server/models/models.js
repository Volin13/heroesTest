const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const Hero = sequelize.define(
  "hero",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nickname: { type: DataTypes.STRING, unique: true, allowNull: false },
    real_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Unknown",
    },
    origin_description: { type: DataTypes.TEXT, allowNull: false },
    sex: { type: DataTypes.STRING, allowNull: false, defaultValue: "Unknown" },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Unknown",
    },
    alignment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Neutral",
    },
    age: { type: DataTypes.STRING, allowNull: false },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mainImg: {
      type: DataTypes.STRING,
      defaultValue:
        "https://res.cloudinary.com/dwgpcl0nu/image/upload/v1709034825/images/upload/default/izi262wviuzdoxpeegl0",
      allowNull: false,
    },
  },
  {
    tableName: "heroes",
    timestamps: true,
  }
);

const HeroCatchPhrase = sequelize.define("catch_phrase", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, defaultValue: "Someone", allowNull: false },
  description: {
    type: DataTypes.TEXT,
    defaultValue: "Smth...smth",
    allowNull: false,
  },
  heroId: { type: DataTypes.INTEGER, allowNull: false },
});

const HeroImages = sequelize.define("heroImages", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fileName: { type: DataTypes.STRING, allowNull: false },
  heroId: { type: DataTypes.INTEGER, allowNull: false },
});

const HeroSuperpowers = sequelize.define("hero_superpowers", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.TEXT, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  heroId: { type: DataTypes.INTEGER, allowNull: false },
});

Hero.hasMany(HeroImages, { foreignKey: "heroId", as: "heroImages" });
Hero.hasMany(HeroSuperpowers, { foreignKey: "heroId", as: "hero_superpowers" });
Hero.hasMany(HeroCatchPhrase, { foreignKey: "heroId", as: "catch_phrases" });

HeroImages.belongsTo(Hero, { foreignKey: "heroId" });
HeroSuperpowers.belongsTo(Hero, { foreignKey: "heroId" });
HeroCatchPhrase.belongsTo(Hero, { foreignKey: "heroId" });

module.exports = {
  Hero,
  HeroCatchPhrase,
  HeroSuperpowers,
  HeroImages,
};
