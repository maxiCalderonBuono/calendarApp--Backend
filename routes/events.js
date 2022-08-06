const { Router } = require("express");

const { validateJWT } = require("../middlewares/jwt-validator");
const { check } = require("express-validator");
const { formFieldsCheck } = require("../middlewares/formFields-validator");
const { isDate } = require("../helpers/isDate");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const router = Router();

router.use(validateJWT);

router.post(
  "/",
  [
    check("title").not().isEmpty().withMessage("Please fill in this field"),
    check("start").custom(isDate),
    check("end").custom(isDate),
    formFieldsCheck,
  ],
  createEvent
);

router.get("/", getEvents);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
