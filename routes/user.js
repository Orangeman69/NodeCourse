const express = require("express");
const User = require("../models/user");
const { asyncWrap } = require("../utils/catchAsync");
const passport = require("passport");
const userControll = require("../controllers/users");

const router = express.Router();

router
  .route("/register")
  .get(userControll.renderRegister)
  .post(userControll.register);

router
  .route("/login")
  .get(userControll.renderLogin)
  .post(
    userControll.preLogin,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    userControll.afterLogin
  );

router.post("/logout", userControll.logout);

module.exports = router;
