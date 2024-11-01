const { Sequelize } = require("sequelize");

let dbName = process.env.DB_NAME || "heroes_lib";
let user = process.env.DB_USER || "heroesLib_owner";
let password = process.env.DB_PASSWORD || "VvJDSxKam4KeZ";
let host = process.env.DB_HOST || "localhost";
let port = process.env.DB_PORT || 5432;
module.exports = new Sequelize(dbName, user, password, {
  dialect: "postgres",
  host: host,
  port: port,
  dialectOptions: {
    ssl: false,
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false,
    // },
  },
});
