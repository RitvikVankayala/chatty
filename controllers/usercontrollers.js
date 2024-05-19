// const emailValidator = require("deep-email-validator");
const User = require("../model/usermodel");
const bcrypt = require("bcrypt");

// async function isEmailValid(email) {
//   return emailValidator.validate(email);
// }

// const sendEmailForVerification = require("../utils/email");

module.exports.reg = async (req, res, next) => {
  try {
    const { Username, Email, Password } = req.body;
    const usernamecheck = await User.findOne({ Username });
    if (usernamecheck)
      return res.json({ msg: "username already exist", status: false });
    const emailcheck = await User.findOne({ Email });
    if (emailcheck)
      return res.json({ msg: "email already used", status: false });

    // const { valid, reason, validators } = await isEmailValid(Email);

    // console.log(valid);

    // if (!valid) {
    //   res.status(400).send({
    //     status: false,
    //     msg: validators[reason].reason
    //   })
    // }

    const hashedPassword = await bcrypt.hash(Password, 10);
    // sendEmailForVerification(Email)
    const user = await User.create({
      Email,
      Username,
      Password: hashedPassword,
    });
    delete user.Password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { Username, Password } = req.body;
    const user = await User.findOne({ Username });
    console.log(user);
    if (!user) return res.json({ msg: "User do not exist", status: false });
    const isvalid = await bcrypt.compare(Password, user.Password);
    if (!isvalid) return res.json({ msg: "incorrect password", status: false });
    delete user.Password;
    return res.json({ status: true, User: user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "Email",
      "Username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
