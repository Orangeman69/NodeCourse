const User = require("../models/user");
const { asyncWrap } = require("../utils/catchAsync");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = asyncWrap(async (req, res) => {
  const { username, email, password } = req.body.user;
  const user = new User({
    username,
    email,
  });
  const registeredUser = await User.register(user, password);
  console.log(registeredUser);
  res.redirect("/login");
});

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.preLogin = (req, res, next) => {
  res.locals.returnTo = req.session.returnTo;
  next();
};

module.exports.afterLogin = (req, res) => {
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  delete res.locals.returnTo;
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = asyncWrap(async (req, res, next) => {
  req.logout((err) => {
    if (err) next(err);
    else {
      res.redirect("/login");
    }
  });
});
