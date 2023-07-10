const { asyncWrap } = require("../utils/catchAsync");
const Campground = require("../models/campground");

module.exports.renderCampgrounds = asyncWrap(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds", { campgrounds: campgrounds.reverse() });
});

module.exports.renderCampground = asyncWrap(async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  res.render("campgrounds/show", { campground });
});

module.exports.renderNewCampground = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.renderUpdateCampground = asyncWrap(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
});

module.exports.createCampground = asyncWrap(async (req, res) => {
  const camp = new Campground({ ...req.body.campground });
  camp.author = req.user._id;
  await camp.save();
  res.redirect(`/campgrounds/${camp._id}`);
});

module.exports.updateCampground = asyncWrap(async (req, res) => {
  const campgroundData = req.body.campground;
  const campground = await Campground.findByIdAndUpdate(
    req.params.id,
    campgroundData
  );
  res.redirect(`/campgrounds/${campground._id}`);
});

module.exports.deleteCampground = asyncWrap(async (req, res) => {
  await Campground.findByIdAndDelete(req.params.id);
  res.redirect("/campgrounds");
});
