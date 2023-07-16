import express from "express";
import { Permissions, Routes } from "../utils/enum";
import UserController from "../controllers/user_controllers";
import { validRequest, verifyPermission } from "../middleware";
import { userCreateSchema } from "../middleware/schemas/userSchema";

const user_route = express.Router();
const user_controller = new UserController();

user_route
  .post(
    Routes.SAVE_USER,
    userCreateSchema,
    user_controller.createUser
  )
  .put(
    Routes.UPDATE_USER,
    verifyPermission([Permissions.USER]),
    user_controller.updateUsers
  )
  .delete(
    Routes.DELETE_USER,
    verifyPermission([Permissions.USER]),
    user_controller.deleteUsers
  );

export default user_route;
