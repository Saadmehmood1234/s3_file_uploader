import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AuthJwtPayload } from "../utils/types.js";

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log("Token", token);
    if (!token) {
      const err: any = new Error("Not authorized, token is missing");
      err.statusCode = 401;
      throw err;
    }
    console.log("Got the token",token)
    try {
      const decode = jwt.verify(token, env.JWT_SECRET) as AuthJwtPayload;
      console.log("check the decode", decode);
      req.userId = decode.userId;

      next();
    } catch {
      console.log("Failed to decode")
      const err: any = new Error("Invalid or expired token");
      err.statusCode = 401;
      throw err;
    }
  },
);
