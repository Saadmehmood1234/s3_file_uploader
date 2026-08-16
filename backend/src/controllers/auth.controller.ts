import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateVerificationToken,
  verifyUserByToken,
} from "../repositories/user.repository.js";
import { hashPassword, validatePassword } from "../utils/passwordHash.js";
import {
  generateVerificationToken,
  hashToken,
} from "../utils/generateToken.js";
import { CreateUserProps } from "../utils/types.js";
import { sendVerificationEmail } from "../services/email.service.js";
import { generateJwtToken } from "../utils/GenerateJwtToken.js";
import { env } from "../config/env.js";
import ErrorResponse from "../utils/ApiError.js";
export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const normalizedEmail = email.toLowerCase().trim();
  const result = await findUserByEmail(normalizedEmail);
  if (result) {
    ErrorResponse("User already exists with this email", 409);
  }
  const hashPass = await hashPassword(password);
  // const verificationToken = generateVerificationToken();
  // const verificationExpiry = new Date(Date.now() + 5 * 60 * 1000);
  const user: CreateUserProps = {
    name,
    email: normalizedEmail,
    password: hashPass,
    // verification_token_hash: verificationToken.hashedToken,
    // verification_token_expires_at: verificationExpiry,
  };
  const newUser=await createUser(user);
  // await sendVerificationEmail(normalizedEmail, verificationToken.token);
  generateJwtToken(newUser.id, res);
  res.status(201).json({
    success: true,
    message: "We have sent you an email. Please verify your email",
  });
});

export const signin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("Emao",email,password)
  // if (!email || !password) {
  //   ErrorResponse("Missing required fields", 400);
  // }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    ErrorResponse("Invalid email or password", 401);
  }
  const isPasswordMatch = await validatePassword(password, user.password_hash);
  if (!isPasswordMatch) {
    ErrorResponse("Invalid email or password", 401);
  }
  // if (!user.is_verified) {
  //   const verificationToken = generateVerificationToken();
  //   const verificationExpiry = new Date(Date.now() + 5 * 60 * 1000);
  //   await updateVerificationToken(
  //     verificationToken.hashedToken,
  //     verificationExpiry,
  //     user.id,
  //   );
  //   await sendVerificationEmail(normalizedEmail, verificationToken.token);
  //   return res.status(200).json({
  //     success: true,
  //     message:
  //       "You are not verified. We have sent you an Email. Please Verify your Email",
  //   });
  // }
  generateJwtToken(user.id, res);
  console.log("Suncces",email,password)
  return res.status(200).json({
    success: true,
    message: "Login Successfully",
  });
});

export const signout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export const verifyUser = asyncHandler(async (req: Request, res: Response) => {
  const token = req.query.token;

  if (!token || typeof token !== "string") {
    ErrorResponse("Token is missing", 400);
  }

  const tokenHash = hashToken(token as string);

  const user = await verifyUserByToken(tokenHash);

  if (!user) {
    ErrorResponse("Invalid or expired verification token", 400);
  }

  generateJwtToken(user.id, res);

  return res.status(200).json({
    success: true,
    message: "User verified successfully",
  });
});

export const fetchUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    ErrorResponse("Unauthorized",401);
  }

  const user = await findUserById(userId!);

  if (!user) {
    ErrorResponse("User not found",404);
  }

  // if (!user.is_verified) {
  //   ErrorResponse("User is not verified",403);
  // }

  return res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});
