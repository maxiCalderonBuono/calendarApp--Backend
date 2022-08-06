const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { genJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Email already in use",
      });
    }

    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await genJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      udi: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact your administrator",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "user o password incorrect",
      });
    }

    const passwordValidation = bcrypt.compareSync(password, user.password);

    if (!passwordValidation) {
      return res.status(400).json({
        ok: false,
        msg: "user o password incorrect",
      });
    }

    const token = await genJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      udi: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact your administrator",
    });
  }
};

const renewJWT = async (req, res = response) => {
  const { uid, name } = req;

  const token = await genJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  createUser,
  login,
  renewJWT,
};
