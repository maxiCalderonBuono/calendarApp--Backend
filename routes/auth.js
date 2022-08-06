const { Router } = require("express");
const { check } = require("express-validator");
const { formFieldsCheck } = require("../middlewares/formFields-validator");
const { createUser, login, renewJWT } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/jwt-validator");

const router = Router();

router.post(
  "/newuser",
  [
    //middlewares
    check("name", "Please fill in this field").not().isEmpty(),
    check("email")
      .isEmail()
      .withMessage("Please introduce a valid email address")
      .not()
      .isEmpty()
      .withMessage("Please fill in this field"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("must be at least 6 chars long")
      .matches(/\d/)
      .withMessage("must contain a number"),
    formFieldsCheck,
  ],
  createUser
);

router.post(
  "/",
  [
    //middlewares

    check("email")
      .isEmail()
      .withMessage("Please introduce a valid email address")
      .not()
      .isEmpty()
      .withMessage("Please fill in this field"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("must be at least 6 chars long")
      .matches(/\d/)
      .withMessage("must contain a number"),
    formFieldsCheck,
  ],
  login
);

router.get("/renew", validateJWT, renewJWT);

module.exports = router;
