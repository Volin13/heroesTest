const Router = require("express");
const router = new Router();

const heroesRouter = require("./heroesRouter");

router.use("/heroes", heroesRouter);
module.exports = router;
