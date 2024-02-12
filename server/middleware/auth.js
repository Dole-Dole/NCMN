import jwt from "jsonwebtoken";
import { config } from "../config.js";

import * as userRepository from "../data/auth.js";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  let token;
  // Check the header first
  const authHeader = req.get("Authorization");
  console.log(authHeader);

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // If no token in the header, check the cookie
  if (!token) {
    token = req.cookies["token"];
  }

  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      console.error("JWT verification error:", error);
      return res.status(401).json(AUTH_ERROR);
    }

    const userId = decoded.id;
    const user = await userRepository.findById(userId);

    if (!user) {
      console.error("User not found");
      return res.status(401).json(AUTH_ERROR);
    }

    req.user = user;
    req.token = token;
    console.log("\n req.user: ", req.user);
    console.log("req.token: ", req.token, "\n");

    next();
  });
};
