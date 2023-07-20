import mongoose, { Schema } from "mongoose";
import { ICategorySchema } from "../utils/interfaces";

const categorySchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
  },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
});

const Category = mongoose.model<ICategorySchema>("category", categorySchema);

export default Category;
