const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

exports.login = async (username, password) => {
  const userDoc = await User.findOne({ username });
  if (userDoc) {
    const isPasswordVerified = bcrypt.compareSync(password, userDoc.password);
    if (isPasswordVerified) {
      const token = jwt.sign({ username, id: userDoc._id }, accessTokenSecret, {});
      return {
        token,
        user: {
          id: userDoc._id,
          username,
          firstName: userDoc.firstName, 
          secondName: userDoc.secondName, 
          profilePic: userDoc.profilePic,
        },
      };
    }
    throw new Error("Wrong credentials.");
  } else {
    throw new Error("User does not exist.");
  }
};

exports.register = async (userData, profilePicPath) => {
  const { firstName, lastName, username, password } = userData;
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

  const userDoc = await User.create({
    firstName,
    lastName,
    username,
    password: hashedPassword,
    profilePic: profilePicPath,
  });

  return userDoc;
};

exports.verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, {}, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};
