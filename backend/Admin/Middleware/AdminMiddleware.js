const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Admin = require("../Model/AdminSchema");
const protectAdmin= asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get Token from Header
      token = req.headers.authorization.split(" ")[1];
      //Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Get Client From Token
      req.Admin = await Admin.findById(decoded._id).select("-password");
      if (req.Admin) next();
      else {
        res.status(401);
        throw new Error("Not authorized 1");
      }
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized 2");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, No token");
  }
});
module.exports = { protectAdmin };
