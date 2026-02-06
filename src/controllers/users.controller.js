exports.getMe = async (req, res) => {
  const userId = req.user.id;
  const result = await usersService.getMe(userId);
  return res.status(result.statusCode).json(result);
};

exports.getAllUsers = async (req, res) => {
  const username = req.query.username;
  const result = await usersService.getAllUsers(username);
  return res.status(result.statusCode).json(result);
};

exports.updateMe = async (req, res) => {
  const userId = req.user.id;
  const { username } = req.body;
  const result = await usersService.updateMe(userId, username);
  return res.status(result.statusCode).json(result);
};
const usersService = require("../services/users.service");

exports.SignUp = async (req, res) => {
  const { username, email, password } = req.body;

  const result = await usersService.CreateUser({ username, email, password });
  return res.status(result.statusCode).json(result);
};

exports.SignIn = async (req, res) => {
  const { email, password } = req.body;

  const result = await usersService.SignIn({ email, password });
  return res.status(result.statusCode).json(result);
};
