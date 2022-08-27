const Category = require("../models/Category");
const createError = require("http-errors");
const { categorySchemaValidator } = require("../validators/schema-validator");

exports.getAllCategories = (req, res, next) => {
  // query the database for all categories

  Category.find({})
    .exec()
    .then((result) => {
      if (result.length === 0) {
        return next(createError(404, "No categories found"));
      }
      res.status(200).send(result);
    })
    .catch((err) => {});
};

exports.createCategory = (req, res, next) => {
  const { error: validationError } = categorySchemaValidator.validate(req.body);

  // console.log("value" + value + "\n" + "error" + error);
  if (validationError) {
    return next(createError(400, validationError));
  }
  // console.log("bhai ye wala", categorySchemaValidator.validate(req.body));

  const category = new Category(req.body);
  category.addedBy = "aman";

  category
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      if (err.message.includes("E11000")) {
        return next(
          createError.Conflict(
            `Category name: ${req.body.name} already exists bro`
          )
        );
      }
      next(createError(err));
    });
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const categoryById = await Category.findById(req.params.id).exec();
    if (!categoryById) {
      next(createError(404, "Category not found"));
      return;
    }

    res.status(200).json(categoryById);
  } catch (error) {
    // console.log(
    // 	"🚀 ~ file: categories.js ~ line 58 ~ exports.getCategoryById= ~ error",
    // 	error
    // );

    next(404, createError(error));
  }
};
