const express = require("express");
const {
  getAllDishes,
  createDish,
  getDishById,
  getDishPhoto,
  getDish,
  searchByCategory,
} = require("../controllers/dishes");

const router = express.Router();

router.get("/dishes", getAllDishes);

router.param("id", getDish);

router.get("/dishes/:id", getDishById);

router.get("/dishes/:id/photo", getDishPhoto);

router.post("/createDish", createDish);

router.post("/dishes/category/search", searchByCategory);

module.exports = router;
