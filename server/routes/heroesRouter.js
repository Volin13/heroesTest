const Router = require("express").Router;
const heroController = require("../controllers/hero/");

const router = new Router();

// Route to create a new hero
router.post("/", heroController.create);

// Route to get all heroes
router.get("/", heroController.getAll);

// Route to get a hero by ID
router.get("/:id", heroController.getOne);

// Route to delete a hero by ID
router.delete("/:id", heroController.deleteOne);

// Route to edit a hero by ID
router.patch("/:id", heroController.edit);

module.exports = router;
