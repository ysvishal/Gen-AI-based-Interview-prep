const jwt = require("jsonwebtoken");
const blackListModel = require("../model/blacklist.model");
async function authUser(req, res, next) {
  const token = req.cookies.token;
  const isTokenBlackListed = await blackListModel.findOne({
    token,
  });
  if (isTokenBlackListed) {
    return res.status(401).json({
      message: "token invalid",
    });
  }
  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next()
} catch (err) {
    return res.status(401).json({
      message: "token invalid",
    });
  }

}

module.exports = {
  authUser,
};
