const userService = require('../service/user-service');

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
}