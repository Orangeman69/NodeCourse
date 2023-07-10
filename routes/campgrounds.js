const express = require("express");
const { asyncWrap } = require("../utils/catchAsync");
const { validateCampground } = require("../utils/validation");
const Campground = require("../models/campground");
const { isLoggedIn, isCampgroundOwner } = require("../utils/middleware");
const campControll = require("../controllers/campgrounds")

const router = express.Router();

router
  .route("/")
  .get(
    campControll.renderCampgrounds
  )
  .post(
    isLoggedIn,
    validateCampground,
    campControll.createCampground
  );

router.get("/new", isLoggedIn, campControll.renderNewCampground);

router
  .route("/:id")
  .get(
 campControll.renderCampground
  )
  .put(
    isLoggedIn,
    isCampgroundOwner,
    validateCampground,
    campControll.updateCampground
  )
  .delete(
    isLoggedIn,
    isCampgroundOwner,
    campControll.deleteCampground
  );

router.get(
  "/:id/edit",
  isLoggedIn,
  isCampgroundOwner,
  campControll.renderUpdateCampground
);

module.exports = router;
