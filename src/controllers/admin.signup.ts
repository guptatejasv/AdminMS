import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Admin } from "../models/admin.Admin";
export const signUp = async (req: Request, res: Response) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      dob,
      street,
      city,
      state,
      pin,
      country,
      firstName,
      lastName,
    } = req.body;
    if (!username) {
      return res.send({ message: "Username is required!" });
    }

    if (!email) {
      return res.send({ message: "Email is required!" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required!" });
    }
    if (!dob) {
      return res.send({ message: "Date of Birth is required!" });
    }
    if (!password) {
      return res.send({ message: "password is required!" });
    }

    // const userExist = await Auth.findOne({ email });
    // if (userExist) {
    //   res.send({ message: "User already exist, Please Login.. " });
    // }
    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
      phone,
      dob,
      address: {
        street,
        city,
        state,
        pin,
        country,
      },
      profile: {
        firstName,
        lastName,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Admin Created Successfully..",
      result: {
        admin,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
