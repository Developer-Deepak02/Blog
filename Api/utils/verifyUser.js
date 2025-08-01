import jwt from "jsonwebtoken";
import {errorHandler} from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookkies.access;
  if (!token) {
    return next(errorHandler(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Token is not valid!"));
    }
    req.user = user;
    next();
  });
}