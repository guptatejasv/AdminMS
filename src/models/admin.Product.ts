import { Schema, Document, model, ObjectId } from "mongoose";

export interface IAuth extends Document {
  sellerId: ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  stock?: number;
  isBlocked?: boolean;
  isBlockedBy?: ObjectId;
  isDeleted: boolean;
  discount?: number;
}

const AuthSchema: Schema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
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
