import { NotAuthorizedError } from "@angelgoezg/common";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: { _id: String };
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace("Bearer ", "") || "";
  try {
    const decoded: any = jwt.verify(token, 'secret-encriptation-key');
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new NotAuthorizedError();
    }
    req.user = user;
  } catch (error) {
  
    throw new NotAuthorizedError();
  }
  next();
};
