const jwt = require("jsonwebtoken");

const authoriseUser = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (auth) {
      const token = auth.split(" ")[1];

      if (token) {
        jwt.verify();
      }
    }
  } catch (error) {}
};
