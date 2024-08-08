import { Schema, Document, model, ObjectId } from "mongoose";

export interface IAuth extends Document {
  adminId: ObjectId;
  name: string;
  description: string;
  price: number;
  DiscountPrice?: number;
  adminDiscountId?: ObjectId[];
  category: string;
  stock?: number;
  isBlocked?: boolean;
  isBlockedBy?: ObjectId;
  isDeleted: boolean;
}

const AuthSchema: Schema = new Schema(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    DiscountPrice: {
      type: Number,
    },
    adminDiscountId: {
      type: [Schema.Types.ObjectId],
    },
    category: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isBlockedBy: {
      type: Schema.Types.ObjectId,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
    },
    discount: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Product = model<IAuth>("Product", AuthSchema);
