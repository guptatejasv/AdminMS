import { Request, Response } from "express";
import { LoginHistory } from "../../models/admin.loginHistories"; // Adjust the import according to your file structure

export const getLoginStatistics = async (req: Request, res: Response) => {
  try {
    // Define date ranges for aggregation
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    console.log(startOfYear);

    // Aggregate logins
    const dailyStats = await LoginHistory.aggregate([
      {
        $match: { logintime: { $gte: startOfDay } },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            date: { $dateToString: { format: "%Y-%m-%d", date: "$logintime" } },
          },
        },
      },
      {
        $group: {
          _id: {
            Date: "$_id.date",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const weeklyStats = await LoginHistory.aggregate([
      {
        $match: { logintime: { $gte: startOfWeek } },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            week: { $isoWeek: "$logintime" },
            year: { $isoWeekYear: "$logintime" },
          },
        },
      },
      {
        $group: {
          _id: { year: "$_id.year", week: "$_id.week" },
          count: { $sum: 1 },
        },
      },
    ]);

    const monthlyStats = await LoginHistory.aggregate([
      {
        $match: { logintime: { $gte: startOfMonth } },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            month: { $month: "$logintime" },
            year: { $year: "$logintime" },
          },
        },
      },
      {
        $group: {
          _id: { year: "$_id.year", month: "$_id.month" },
          count: { $sum: 1 },
        },
      },
    ]);

    const yearlyStats = await LoginHistory.aggregate([
      {
        $match: { logintime: { $gte: startOfYear } },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            year: { $year: "$logintime" },
          },
        },
      },
      {
        $group: {
          _id: "$_id.year",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        daily: dailyStats,
        weekly: weeklyStats,
        monthly: monthlyStats,
        yearly: yearlyStats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
