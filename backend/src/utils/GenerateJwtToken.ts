import { Response } from "express";
import { env } from "../config/env.js";
import jwt from "jsonwebtoken";
export const generateJwtToken = async (userId: string, res: Response) => {
  const secret = env.JWT_SECRET;
  console.log("secret",secret)
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    secure: env.NODE_ENV === "production",
    maxAge: 10 * 24 * 60 * 60 * 1000,
    path: "/",
  });
  return token;
};
