const { asyncWrap } = require("../utils/catchAsync");
const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.createReview = asyncWrap(async (req, res) => {
  const campId = req.params.campId;
  const camp = await Campground.findById(campId);
  const review = new Review(req.body.review);
  review.author = req.user;
  camp.reviews.push(review);
  await review.save();
  await camp.save();
  res.redirect(`/campgrounds/${campId}`);
});

module.exports.deleteReview = asyncWrap(async (req, res) => {
  const { campId, revId } = req.params;
  await Campground.findByIdAndUpdate(campId, {
    $pull: { reviews: revId },
  });
  await Review.findByIdAndDelete(revId);
  res.redirect(`/campgrounds/${campId}`);
});
