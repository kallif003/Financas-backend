"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const user_controllers_1 = __importDefault(require("../controllers/user_controllers"));
const middleware_1 = require("../middleware");
const userSchema_1 = require("../middleware/schemas/userSchema");
const user_route = express_1.default.Router();
const user_controller = new user_controllers_1.default();
user_route
    .post(enum_1.Routes.SAVE_USER, userSchema_1.userCreateSchema, user_controller.createUser)
    .put(enum_1.Routes.UPDATE_USER, (0, middleware_1.verifyPermission)([enum_1.Permissions.USER]), user_controller.updateUsers)
    .delete(enum_1.Routes.DELETE_USER, (0, middleware_1.verifyPermission)([enum_1.Permissions.USER]), user_controller.deleteUsers);
exports.default = user_route;
//# sourceMappingURL=users_route.js.map