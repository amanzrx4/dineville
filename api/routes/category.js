const express = require("express");
const {
  getAllCategories,
  createCategory,
  getCategoryById,
} = require("../controllers/categories");

const router = express.Router();

router.get("/categories/:id", getCategoryById);

router.get("/categories", getAllCategories);

router.post("/createCategory", createCategory);

module.exports = router;
