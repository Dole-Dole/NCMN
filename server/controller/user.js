import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as authRepository from "../data/auth.js";

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

    // 사용자 조회
    const user = await authRepository.findById(userID);

    // 사용자가 존재하지 않거나 비밀번호가 일치하지 않는 경우 에러 응답
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid id or password" });
    }

    // JWT 토큰 생성 및 설정
    const token = generateAccessToken(user.userID);
    setToken(res, token);

    // 로그인 성공 응답
    res.status(200).json({ token, userID: user.userID });
  } catch (error) {
    // 에러 발생 시 적절한 응답
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function generateAccessToken(userId) {
  return jwt.sign({ userId }, jwtsecretKey, {
    expiresIn: jwtexpiresInSec,
  });
}

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000, //쿠키 만료 시간
    httpOnly: true,
    sameSite: "none", // 동일한 도메인이 아니더라도 http가 동작
    secure: true,
  };
  res.cookie("token", token, options); //HTTP-ONLY cookie
}

export async function me(req, res, next) {
  console.log(req.userId);
  const user = await authRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
}
