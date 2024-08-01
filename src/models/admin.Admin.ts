import { Schema, Document, model } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
  phone: string;
  profile: {
    firstName: string;
    lastName: string;
  };
  dob: Date;
  address: {
    street: string;
    city: string;
    state: string;
    pin: string;
    country: string;
  };
  role: string;
  isVerified: boolean;
  isTwoFAEnable: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

const AuthSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profile: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },

    isTwoFAEnable: {
      type: Boolean,
      default: false,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pin: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    role: {
      type: String,
      default: "admin",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Admin = model<IAdmin>("Admin", AuthSchema);
