const { registerUser, loginUser } = require("../services/authService");

exports.login_user = async (req, res, next) => {
  const { email, password } = req.body;

  loginUser({ email, password })
    .then((result) => {
      const { statusCode = 200, message, data, token } = result;
      res.status(statusCode).send({ message, data, token });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data });
    });
};

exports.register_user = async (req, res, next) => {
  const { fname, lname, email, password, username } = req.body;

  registerUser({ username, fname, lname, email, password })
    .then((result) => {
      const { statusCode = 200, message, data, token } = result;
      res.status(statusCode).send({ message, data, token });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data });
    });
};
