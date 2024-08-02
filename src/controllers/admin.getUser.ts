import { Request, Response } from "express";
import { Auth } from "../models/admin.model";

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(200).json({
        status: "success",
        message: "No user is exist with this userId",
      });
    }

    res.status(200).json({
      status: "success",
      result: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
