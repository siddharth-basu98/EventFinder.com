
// static user details
const userData = {
    userId: "789789",
    password: "admin",
    name: "admin",
    username: "admin",
    isAdmin: true,
  };
  
const utils = require('../../utils') ; 
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (app) => {


app.post("/users/signin", function (req, res) {
    const user = req.body.username;
    const pwd = req.body.password;
  
    // return 400 status if username/password is not exist
    if (!user || !pwd) {
      return res.status(400).json({
        error: true,
        message: "Username or Password required.",
      });
    }
  
    // return 401 status if the credential is not match.
    if (user !== userData.username || pwd !== userData.password) {
      return res.status(401).json({
        error: true,
        message: "Username or Password is Wrong.",
      });
    }
  
    // generate token
    const token = utils.generateToken(userData);
    // get basic user details
    const userObj = utils.getCleanUser(userData);
    // return the token along with user details
    return res.json({ user: userObj, token });
  });
  
  // verify the token and return it if it's valid
  app.get("/verifyToken", function (req, res) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token;
    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Token is required.",
      });
    }
    // check token that was passed by decoding token using secret
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err)
        return res.status(401).json({
          error: true,
          message: "Invalid token.",
        });
  
      // return 401 status if the userId does not match.
      if (user.userId !== userData.userId) {
        return res.status(401).json({
          error: true,
          message: "Invalid user.",
        });
      }
      // get basic user details
      var userObj = utils.getCleanUser(userData);
      return res.json({ user: userObj, token });
    });
  });

}