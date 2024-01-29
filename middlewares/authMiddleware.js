require("dotenv").config();
const jwt = require("jsonwebtoken");
const { findByIdUserService } = require("../service/userService")

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.send(401);
    }
    const parts = authorization.split(" ");
    if (parts.length !== 2) {
      return res.send(401);
    }
    const [schema, token] = parts;
    if (schema !== "Bearer") {
      return res.send(401);
    }
    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if(error){
        return res.status(401).send({ message: "Token Invalid!"})
      }
      const user = await findByIdUserService(decoded.id)
      req.userId = user.id

      return next();
    });
  } catch (error) {
    res.status(500).send(error.message)
  }
};

module.exports = authMiddleware