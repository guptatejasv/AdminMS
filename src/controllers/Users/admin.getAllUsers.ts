import { Request, Response } from "express";
import { Auth } from "../../models/admin.model";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Extract page and limit from query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch users with pagination and limit
    const users = await Auth.find().skip(skip).limit(limit);

    // Get the total count of users
    const totalUsers = await Auth.countDocuments();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
