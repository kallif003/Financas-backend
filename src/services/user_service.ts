import bcrypt from "bcrypt";
import User from "../models/users";
import { IUser, UserDataService } from "../utils/interfaces";
import HandleError from "../utils/errors/handleError";

class UserService {
  static async createUser(userData: UserDataService) {
    try {
      const { email } = userData;

      // Verifique se o username já existe no banco de dados
      const existingUser = await User.findOne({
        email,
        deleted: false,
      });

      if (existingUser != null) {
        throw new HandleError("Email já existente", 409);
      }

      const saltRounds = 8;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      userData.password = hashedPassword;

      const newUser = new User({
        ...userData,
      });

      const savedUser = await newUser.save();

      return savedUser;
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async updateUser(updatedData: IUser[], id: string) {
    try {
      let existingUser: any;

      if (updatedData[0].email) {
        existingUser = await User.findOne({
          username: updatedData[0].email,
          deleted: false,
        });
      }

      if (existingUser != null) {
        throw new HandleError("Email já existente", 409);
      }

      let user = (await User.findById(id)) as any;

      for (const key in updatedData[0]) {
        const value = updatedData[0][key as keyof IUser];

        if (value) {
          user[key] = value;
        }
      }

      const updatedUser = await user!.save();

      return updatedUser;
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error("Usuário não encontrado");
    }
  }

  static async deleteUser(userId: string) {
    try {
      const currentDate = new Date();

      const user = await User.findByIdAndUpdate(
        userId,
        {
          deleted: true,
          deletedAt: currentDate,
        },
        { new: true }
      );

      return user;
    } catch (error: any) {
      throw new Error("Usuário não encontrado");
    }
  }
}

export default UserService;
