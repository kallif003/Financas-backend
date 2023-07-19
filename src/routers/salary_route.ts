import express from "express";
import SalaryController from "../controllers/salary_controller";
import { Routes } from "../utils/enum";
import { verifyPermission } from "../middleware";
import { Permissions } from "../utils/enum";

const salary_route = express.Router();
const salary_controller = new SalaryController();

salary_route
  .get(
    Routes.GET_SALARY,
    verifyPermission([Permissions.USER]),
    salary_controller.getSalarary
  )
  .put(
    Routes.SAVE_SALARY,
    verifyPermission([Permissions.USER]),
    salary_controller.registerSalary
  );

export default salary_route;
