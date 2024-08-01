import { Request, Response } from "express";
// import { Admin } from "../models/admin.Admin";
// import bcrypt from "bcryptjs";
// import { sign } from "jsonwebtoken";
import axios from "axios";
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const USER_SERVICE_URL = "http://127.0.0.1:3001/api/v1/seller/provide";
    const response = await axios.get(`${USER_SERVICE_URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
