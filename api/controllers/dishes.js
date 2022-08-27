const Dish = require("../models/Dish");
const createError = require("http-errors");
const imageTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const { dishSchemaValidator } = require("../validators/schema-validator");
const chalk = require("chalk");

exports.searchByCategory = async (req, res, next) => {
  const { categories } = req.body;

  let criteria = {};

  try {
    if (categories.length === 0) {
      return next(createError(404, "No categories specified"));
    }

    criteria = { category: { $in: categories } };

    const result = await Dish.find(criteria)
      .select("-photo")
      .populate("category", "_id name");

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getDishPhoto = async (req, res) => {
  const dish = req.dish;
  if (dish.photo.data) {
    res.set("Content-Type", dish.photo.contentType);
    res.send(dish.photo.data);
  } else {
    return res.status(204).json({ message: "No data found" });
  }
};

exports.getDishById = async (req, res, next) => {
  req.dish.photo = undefined;
  res.status(200).json(req.dish);
};

exports.getDish = async (req, res, next, id) => {
  try {
    const dish = await Dish.findById(id).exec();
    // if (!categoryById) {
    // 	next(createError(404, "Category not found"));
    // 	res.end()
    // }
    if (!dish) {
      next(createError(404, "Category not found"));
      return;
    }

    req.dish = dish;
    next();
  } catch (error) {
    // console.log(
    // 	"🚀 ~ file: categories.js ~ line 58 ~ exports.getCategoryById= ~ error",
    // 	error
    // );

    next(404, createError(error));
  }
};

exports.getAllDishes = (req, res, next) => {
  // query the database for all categories

  let allDishQuery = {};

  if (req.query.categories) {
    allDishQuery.category = {
      $in: req.query.categories,
    };
  }

  console.log("alldishes", allDishQuery);

  Dish.find(allDishQuery)
    .populate("category", "_id, name")
    .exec()
    .then((result) => {
      /* if (result.length === 0) {
        return next(createError(404, "No dishes found"));
      } */
      result.photo = undefined;

      res.status(200).send(result);
    })
    .catch((err) => {});
};

exports.createDish = (req, res, next) => {
  const { name, description, price, category, photo } = req.body;

  const { error: validationError } = dishSchemaValidator.validate({
    name,
    description,
    price,
    category,
  });

  if (validationError) {
    return next(createError(400, validationError));
  }

  const dish = new Dish({ name, description, price, category });
  dish.addedBy = "aman";
  // dish.photo = {};

  uploadImage(dish, photo);

  dish
    .save()
    .then((result) => {
      result.photo = undefined;

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

const uploadImage = ({ photo = {} }, photoFromUser) => {
  if (!photoFromUser || !imageTypes.includes(photoFromUser.type)) return;

  photo.data = new Buffer.from(photoFromUser.data, "base64");
  photo.contentType = photoFromUser.type;
};
