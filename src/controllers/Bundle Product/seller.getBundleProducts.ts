import { Request, Response } from "express";
import { BundleProduct } from "../../models/admin.BundleProduct";

export const getBundleProducts = async (req: Request, res: Response) => {
  try {
    // Extract page and limit from query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch bundle products with pagination and limit, excluding deleted ones
    const bundleProducts = await BundleProduct.find({
      isDeleted: false,
    })
      .skip(skip)
      .limit(limit);

    // Get the total count of bundle products (excluding deleted ones)
    const totalBundleProducts = await BundleProduct.countDocuments({
      isDeleted: false,
    });

    res.status(200).json({
      status: "success",
      results: bundleProducts.length,
      data: {
        bundleProducts,
      },
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalBundleProducts / limit),
        totalBundleProducts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
