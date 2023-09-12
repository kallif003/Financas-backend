import mongoose, { Schema } from "mongoose";
import { IRelease, IReleaseSchema } from "../utils/interfaces";

const releaseSchema: Schema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  destinedValue: {
    type: Number,
    required: true,
  },
  release: {
    type: Array<IRelease>,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
});

const ReleaseModel = mongoose.model<IReleaseSchema>("release", releaseSchema);

export default ReleaseModel;
