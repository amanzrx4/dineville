const Dish = require("../models/Dish");
const createError = require("http-errors");
const imageTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const { dishSchemaValidator } = require("../validators/schema-validator");

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
    console.log("still running", dish);

    req.dish = dish;
    next();
  } catch (error) {
    // console.log(
    // 	"🚀 ~ file: categories.js ~ line 58 ~ exports.getCategoryById= ~ error",
    // 	error
    // );
    console.log("error hai bhai", error);

    next(404, createError(error));
  }
};

exports.getAllDishes = (req, res, next) => {
  // query the database for all categories

  Dish.find({})
    .populate("category", "_id, name")
    .exec()
    .then((result) => {
      if (result.length === 0) {
        return next(createError(404, "No dishes found"));
      }
      console.log("🚀 ~ file: categories.js ~ line 9 ~ result ~ res", result);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log("🚀 ~ file: categories.js ~ line 12 ~ .then ~ err", err);
    });
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
      console.log("error in creating cateogory", err);
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
