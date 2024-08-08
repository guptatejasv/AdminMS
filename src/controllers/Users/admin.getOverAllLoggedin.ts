import { Request, Response } from "express";

import { LoginHistory } from "../../models/admin.loginHistories";

export const getOverAllLoggedin = async (req: Request, res: Response) => {
  const search = req.query.search;
  const today = new Date();
  if (search == "daily") {
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const loginUsers = await LoginHistory.find({
      logintime: { $gte: today, $lt: tomorrow },
      role: "user",
    });
    const loginSellers = await LoginHistory.find({
      logintime: { $gte: today, $lt: tomorrow },
      role: "seller",
    });
    const logins = loginSellers.length + loginUsers.length;
    return res.status(200).json({
      status: "success",
      total_results: logins,
      data: {
        seller: {
          total_logins: loginSellers.length,
          data: {
            loginSellers,
          },
        },
        user: {
          total_logins: loginUsers.length,
          data: {
            loginUsers,
          },
        },
      },
    });
  } else if (search == "weekly") {
    const firstDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    firstDayOfWeek.setHours(0, 0, 0, 0);

    const loginUsers = await LoginHistory.find({
      logintime: { $gte: firstDayOfWeek },
      role: "user",
    });
    const loginSellers = await LoginHistory.find({
      logintime: { $gte: firstDayOfWeek },
      role: "seller",
    });
    const logins = loginSellers.length + loginUsers.length;

    return res.status(200).json({
      status: "success",
      total_results: logins,
      data: {
        seller: {
          total_logins: loginSellers.length,
          data: {
            loginSellers,
          },
        },
        user: {
          total_logins: loginUsers.length,
          data: {
            loginUsers,
          },
        },
      },
    });
  } else if (search == "monthly") {
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const loginUsers = await LoginHistory.find({
      logintime: { $gte: firstDayOfMonth },
      role: "user",
    });
    const loginSellers = await LoginHistory.find({
      logintime: { $gte: firstDayOfMonth },
      role: "seller",
    });
    const logins = loginSellers.length + loginUsers.length;

    return res.status(200).json({
      status: "success",
      total_results: logins,
      data: {
        seller: {
          total_logins: loginSellers.length,
          data: {
            loginSellers,
          },
        },
        user: {
          total_logins: loginUsers.length,
          data: {
            loginUsers,
          },
        },
      },
    });
  } else if (search == "yearly") {
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

    const loginUsers = await LoginHistory.find({
      logintime: { $gte: firstDayOfYear },
      role: "user",
    });
    const loginSellers = await LoginHistory.find({
      logintime: { $gte: firstDayOfYear },
      role: "seller",
    });
    const logins = loginSellers.length + loginUsers.length;

    return res.status(200).json({
      status: "success",
      total_results: logins,
      data: {
        seller: {
          total_logins: loginSellers.length,
          data: {
            loginSellers,
          },
        },
        user: {
          total_logins: loginUsers.length,
          data: {
            loginUsers,
          },
        },
      },
    });
  }
};
