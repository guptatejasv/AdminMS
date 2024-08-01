import { Request, Response } from "express";
import { Admin } from "../models/admin.Admin";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
export const signIn = async (req: Request, res: Response) => {
  try {
    if (req.body.username) {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(401).json({
          status: "fail",
          message: "Please enter Username and Password both..",
        });
      }
      const admin = await Admin.findOne({ username }).select("+password");

      if (!admin) {
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const secret = process.env.JWT_SECRET as string;

      const token = sign({ id: admin._id }, secret, {
        expiresIn: "90d",
      });
      if (admin && isMatch) {
        res.status(200).json({
          status: "success",
          token,
          message: "You are logged in successfully..!",
        });
      }
    } else if (req.body.email) {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(401).json({
          status: "fail",
          message: "Please enter Email and Password both..",
        });
      }
      const admin = await Admin.findOne({ email }).select("+password");

      if (!admin) {
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const secret = process.env.JWT_SECRET as string;

      const token = sign({ id: admin._id }, secret, {
        expiresIn: "90d",
      });
      
      if (admin && isMatch) {
        res.status(200).json({
          status: "success",
          token,
          message: "You are logged in successfully..!",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
