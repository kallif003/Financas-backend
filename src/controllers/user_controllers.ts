import { Request, Response } from "express";
import UserService from "../services/user_service";
import { IUser } from "../utils/interfaces";
import HandleError from "../utils/errors/handleError";
import { Permissions } from "../utils/enum";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const role = [Permissions.USER];

      const createUser = await UserService.createUser({
        name,
        role,
        password,
        email,
      });

      return res.status(201).json(createUser);
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  async updateUsers(req: Request, res: Response) {
    try {
      const {
        name,
        password,
        email,
      }: IUser = req.body;

      const { id } = req.params;

      const user = await UserService.updateUser(
        [{ name, password, email }],
        id
      );

      return res.status(200).json(user);
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(404).send({ message: error.message });
    }
  }

  async deleteUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await UserService.deleteUser(id);

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).send({ message: error.message });
    }
  }
}

export default UserController;