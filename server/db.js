const { Sequelize } = require("sequelize");

let dbName = process.env.DB_NAME || "/neondb";
let user = process.env.DB_USER || "neondb_owner";
let password = process.env.DB_PASSWORD || "bt2aTFsOA1Ur ";
let host =
  process.env.DB_HOST || "ep-little-rain-a28bgx9g.eu-central-1.aws.neon.tech";
let port = process.env.DB_PORT || 5432;
module.exports = new Sequelize(dbName, user, password, {
  dialect: "postgres",
  host: host,
  port: port,
  dialectOptions: {
    // ssl: false,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
