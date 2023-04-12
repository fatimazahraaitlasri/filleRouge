const jwt = require("jsonwebtoken");
//Generate JWT
const generateToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};
module.exports = generateToken;
