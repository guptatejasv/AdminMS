import { Request, Response } from "express";
import { Auth } from "../models/admin.model";
export const blockUnblockUser = async (req: Request, res: Response) => {
  try {
    const adminId = req.user.id;
    const userId = req.params.id;
    const { action } = req.body;
    const blockUnblockUser = await Auth.findById(userId);

    if (action == "Block") {
      if (blockUnblockUser) {
        blockUnblockUser.isBlocked = true;
        blockUnblockUser.isBlockedBy = adminId;
        blockUnblockUser.save();
        return res.status(200).json({
          status: "success",
          message: `User is ${action}ed successfully..`,
        });
      }
    } else if (action == "Unblock") {
      if (blockUnblockUser) {
        blockUnblockUser.isBlocked = false;
        blockUnblockUser.isBlockedBy = undefined;
        blockUnblockUser.save();
        return res.status(200).json({
          status: "success",
          message: `User is ${action}ed successfully..`,
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
