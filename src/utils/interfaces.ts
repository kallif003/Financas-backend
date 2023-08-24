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

export interface IUpdateCategory {
  userId: string;
  name: string;
  value: string;
}

export interface IRelease {
  idRelease: string;
  name: string;
  value: number;
  locale: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  deletedAt: Date;
}

export interface IReleasesData {
  category: string;
  destinedValue: string;
  idRelease: string;
  name: string;
  value: number;
  date: Date;
  userId: string;
  locale: string;
  createdAt: string;
}

export interface IUpdateRelease {
  name: string;
  value: number;
  date: Date;
  locale: string;
}

export interface IReleaseSchema {
  category: string;
  destinedValue: number;
  release: Array<IRelease>;
  userId: string;
  createdAt: string;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}
