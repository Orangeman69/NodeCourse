const { asyncWrap } = require("../utils/catchAsync");
const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    console.log("You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isCampgroundOwner = asyncWrap(async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (
    req.user &&
    campground.author &&
    !campground.author._id.equals(req.user._id)
  ) {
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
});

module.exports.isReviewOwner = asyncWrap(async (req, res, next) => {
  const { campId, revId } = req.params;
  const review = await Review.findById(revId);
  console.log("author", review.author, "requser", req.user);
  if (!review.author._id.equals(req.user._id)) {
    return res.redirect(`/campgrounds/${campId}`);
  }
  next();
});
