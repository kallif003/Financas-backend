"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const salary_controller_1 = __importDefault(require("../controllers/salary_controller"));
const enum_1 = require("../utils/enum");
const salary_route = express_1.default.Router();
const salary_controller = new salary_controller_1.default();
salary_route
    .get(enum_1.Routes.GET_SALARY, salary_controller.getSalarary)
    .put(enum_1.Routes.SAVE_SALARY, salary_controller.registerSalary);
exports.default = salary_route;
//# sourceMappingURL=salary_route.js.map