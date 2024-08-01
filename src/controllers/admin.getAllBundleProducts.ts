import { Request, Response } from "express";
import { Admin } from "../models/admin.Admin";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import axios from "axios"; // To make HTTP requests to the user service
export const getAllBundleProducts = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `127.0.0.1:3001/api/v1/seller/getProducts`
    );
    console.log(response);
    // here is the code
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
