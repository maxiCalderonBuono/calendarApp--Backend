const moment = require("moment");

const isDate = (value) => {
  if (!value) {
    return Promise.reject("Please fill in this field");
  }

  const fecha = moment(value);

  switch (false) {
    case fecha.isValid():
      return Promise.reject("Please introduce a valid date");
    // case !fecha.isBefore(moment()):
    //   return Promise.reject("Start date must be at least current date");
    default:
      return true;
  }
};

module.exports = {
  isDate,
};
