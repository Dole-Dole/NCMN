import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as authRepository from "../data/auth.js";
import { config } from "../config.js";

export async function signup(req, res) {
  try {
    const { userID, password, userName, birthday, university, phone } =
      req.body;

    const found = await authRepository.findById(userID);
    if (found) {
      return res.status(409).json({ message: `${userID} already exists` });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      config.bcrypt.saltRounds
    );

    const createdUserId = await authRepository.createUser({
      userID,
      password: hashedPassword,
      userName,
      birthday,
      university,
      phone,
    });

    const token = generateAccessToken(createdUserId);
    setToken(res, token);

    res.status(201).json({ token, createdUserId });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { userID, password } = req.body;

    const user = await authRepository.findById(userID);
    if (!user) {
      return res.status(401).json({ message: "Invalid id or password" });
    } else if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid id or password" });
    }

    const token = generateAccessToken(user.userId);
    setToken(res, token);

    res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function generateAccessToken(userId) {
  return jwt.sign({ userId }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.cookie("token", token, options);
}

export async function me(req, res, next) {
  try {
    const user = await authRepository.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ token: req.token, username: user.username });
  } catch (error) {
    console.error("Error during me:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
