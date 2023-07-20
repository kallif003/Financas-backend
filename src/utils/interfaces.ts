import { Document } from "mongoose";

export interface IRefreshToken extends Document {
  userId: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserSchema extends Document {
  name: string;
  role: string[];
  password: string;
  email: string;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

export interface ICategorySchema extends Document {
  name: string;
  value: number;
  userId: string;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

export interface ISalarySchema extends Document {
  value: number;
  userId: string;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

export interface IUser {
  name?: string;
  password: string;
  email: string;
  id?: string;
}

export interface UserDataService {
  name: string;
  role: string[];
  password: string;
  email: string;
}
