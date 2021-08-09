const { Router } = require("express");

const { COOKIE_NAME } = require("../config/config");
const authService = require("../services/authService");
const validator = require("validator");
const { check, validationResult } = require("express-validator");

const isGuest = require("../middlewares/isGuest");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", isGuest, async (req, res) => {
  try {
    let token = await authService.login(req.body);

    res.cookie(COOKIE_NAME, token);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.render("login", { error });
  }
});

const isStrongPasswordMiddleware = (req, res, next) => {
  let password = req.body.password;

  let isStrong = validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

  if (!isStrong) {
    return res.render("register", {
      error: { message: "You should have strong password" },
      username: req.body.username,
    });
  }
};

router.post(
  "/register",
  isGuest,
  //isStrongPassword,
  // check('email', 'Your email is not valid').isEmail().normalizeEmail(),
  // check('username', 'Specify username.').notEmpty(),
  // check("password", 'Password too short').isLength({ min: 5 }),
  async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
      return res.render("register", {error: {message: "Password missmatch"} });
    }

    let errors = validationResult(req);
    console.log(req.body.email);
    if(errors.errors.length > 0) {
        return res.render("register", errors );
    }

    try {
      let result = await authService.register(req.body);

      console.log(result);
      res.redirect("/auth/login");
    } catch (err) {
      let error = Object.keys(err.errors).map(x => ({message: err.errors[x].properties.message}))[0];
      console.log(error)
      res.render("register", { error });
    }
  }
);

router.get("/register", isGuest, (req, res) => {
  res.render("register");
});

router.get("/logout", isAuthenticated, (req, res) => {
  res.clearCookie(COOKIE_NAME);

  res.redirect("/");
});

module.exports = router;
