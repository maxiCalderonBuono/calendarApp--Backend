const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      //!origin represents request from tools such Postman
      callback(null, true); //the first argument represents an error, the second one, a boolean to allow access
    } else {
      callback(new Error("Not allow by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "x-token",
    "Authorization",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

module.exports = corsOptions;
