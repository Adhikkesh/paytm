import { JWT_SECRETKEY } from "./config.js";
import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const token = bearer.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRETKEY);
    req.id = decode.id;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid or expired token" });
  }
};
