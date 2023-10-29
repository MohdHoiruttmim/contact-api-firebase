const ReponseError = require("../error/response-error");
const { registerUserValidation } = require("../validation/user-validation");
const { validate } = require("../validation/validation");
const bcrypt = require("bcrypt");
const db = require("../application/database");

const register = async (request) => {
  const { username, password, name } = request;

  validate(registerUserValidation, request);
  const ref = db.ref("users");

  // check if username already exists
  const snapshot = await ref.orderByChild("username").equalTo(username).get();
  if (snapshot.exists()) {
    throw new ReponseError(400, "Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const registerUser = {
    username,
    password: hashedPassword,
    name,
  };

  const newChildRef = ref.push(registerUser);

  return {
    id: newChildRef.key,
  };
}

module.exports = {
  register
};