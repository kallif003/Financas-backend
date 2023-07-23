"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = __importDefault(require("../controllers/category_controller"));
const enum_1 = require("../utils/enum");
const middleware_1 = require("../middleware");
const category_route = express_1.default.Router();
const category_controller = new category_controller_1.default();
category_route
    .post(enum_1.Routes.GET_CATEGORY_NAME, (0, middleware_1.verifyPermission)([enum_1.Permissions.USER]), category_controller.getNameOfAllCategories)
    .post(enum_1.Routes.GET_CATEGORY_BY_ID, (0, middleware_1.verifyPermission)([enum_1.Permissions.USER]), category_controller.getCategoryById)
    .post(enum_1.Routes.GET_CATEGORIES, (0, middleware_1.verifyPermission)([enum_1.Permissions.USER]), category_controller.getCategories)
    .post(enum_1.Routes.SAVE_CATEGORY, (0, middleware_1.verifyPermission)([enum_1.Permissions.USER]), category_controller.createCategory);
exports.default = category_route;
//# sourceMappingURL=category_route.js.map