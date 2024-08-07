import { Schema, Document, model, ObjectId } from "mongoose";

export interface IAuth extends Document {
  sellerId?: ObjectId;
  adminId?: ObjectId;
  productId: ObjectId;
  discountCoupon?: string;
  discount?: number;
  startDate?: Date;
  endDate?: Date;
  isBlocked?: boolean;
  isBlockedBy?: ObjectId;
  isDeleted: boolean;
}

const AuthSchema: Schema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    discountCoupon: {
      type: String,
      unique: true,
    },
    discount: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isBlockedBy: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Discount = model<IAuth>("Discount", AuthSchema);
