const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blackListModel = require('../model/blacklist.model')

/**
 * @name registerUserController
 * @description Register a new user, expects username, email and password
 * @access Public
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email and password are required.",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    if (isUserAlreadyExists.username == username) {
      return res.status(400).json({
        message: "Username already exists!",
      });
    } else {
      return res.status(400).json({
        message: "Email already exists!",
      });
    }
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully",
    user: user,
    token: token
  });
}

/**
 * @name loginUserController
 * @description Login a user, expects username/email and password
 * @access Public
 */
async function loginUserController(req, res) {
  const { email: email, username: username, password } = req.body;
  
  if (!email && !username) {
    return res.status(400).json({
      message: "Email/Username is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "password is required",
    });
  }
  
  const user = await userModel.findOne({
    $or: [{ email: email }, { username: username }],
  });
  
  if (!user) {
    return res.status(400).json({
      message: "User doesn't exist, please register.",
    });
  }
  
  const decoded = await bcrypt.compare(password, user.password);
  
  if (!decoded) {
    return res.status(400).json({
      message: "password is incorrect",
    });
  }
  
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  
  res.cookie("token", token);
  return res.status(200).json({
    message: "user logged in successfully",
    user: user,
    token,
  });
}

/**
 * @name logoutUserController
 * @description Logout a user
 * @access Public
 */
async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if(token) {
    await blackListModel.create({
      token
    })
  }

  res.clearCookie('token')

  res.status(200).json({
    message: "User logged out successfully"
  })

}

/**
 * @name getUserController
 * @description get user details, such as username, email
 * @access Public
 */
async function getUserController(req, res) {
    
  const user = await userModel.findOne({
    _id: req.user.userId,
  })

  return res.status(200).json({
    message: "User found successfully",
    user: user,
  })
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getUserController,
};
