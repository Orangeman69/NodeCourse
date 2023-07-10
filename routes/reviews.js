const express = require("express");
const { asyncWrap } = require("../utils/catchAsync");
const { validateReview } = require("../utils/validation");
const Campground = require("../models/campground");
const Review = require("../models/review");
const { isLoggedIn, isReviewOwner } = require("../utils/middleware");
const reviewControll = require("../controllers/reviews");

const router = express.Router({ mergeParams: true });

router.post("/", isLoggedIn, validateReview, reviewControll.createReview);

router.delete(
  "/:revId",
  isLoggedIn,
  isReviewOwner,
  reviewControll.deleteReview
);

module.exports = router;
