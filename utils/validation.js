const Joi = require("joi");
const ExpressError = require("./ExpressError");

const campgroundJoiSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required().min(0),
  }).required(),
});

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundJoiSchema.validate({
    campground: req.body.campground,
  });

  if (error) {
    const details = error.details.map((e) => e.message).join(",");
    throw new ExpressError(details, 400);
  } else {
    next();
  }
};

const reviewJoiSchema = Joi.object({
  review: Joi.object({
    text: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
  }).required(),
});

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewJoiSchema.validate({ review: req.body.review });
  if (error) {
    const details = error.details.map((e) => e.message).join(",");
    throw new ExpressError(details, 400);
  }
  next();
};
