import { Request, Response } from "express";
import { Auth } from "../models/admin.model";
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await Auth.find();
    if (users) {
      res.status(200).json({
        status: "success",
        results: users.length,
        data: {
          users,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
