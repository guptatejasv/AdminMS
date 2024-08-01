import { Request, Response } from "express";
import { Admin } from "../models/admin.Admin";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

export const blockUnblockBundleProduct = async (
  req: Request,
  res: Response
) => {
  try {
    // here is the code
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
