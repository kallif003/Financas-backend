import mongoose, { Schema } from "mongoose";
import { ISalarySchema } from "../utils/interfaces";

const salarySchema: Schema = new mongoose.Schema({
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

const Salary = mongoose.model<ISalarySchema>("salary", salarySchema);

export default Salary;
