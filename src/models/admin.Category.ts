import { Schema, Document, model } from "mongoose";

export interface ICategory extends Document {
  categoryName: string;
  createdBy: string;
  isDeleted?: boolean;
}

const AuthSchema: Schema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Category = model<ICategory>("Category", AuthSchema);
