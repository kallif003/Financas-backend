"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = __importDefault(require("../controllers/category_controller"));
const enum_1 = require("../utils/enum");
const category_route = express_1.default.Router();
const category_controller = new category_controller_1.default();
category_route
    .post(enum_1.Routes.GET_CATEGORY_NAME, category_controller.getNameOfAllCategories)
    .post(enum_1.Routes.GET_CATEGORY_BY_ID, category_controller.getCategoryById)
    .post(enum_1.Routes.GET_CATEGORIES, category_controller.getCategories)
    .post(enum_1.Routes.SAVE_CATEGORY, category_controller.createCategory)
    .put(enum_1.Routes.UPDATE_CATEGORY, category_controller.updateCategory)
    .delete(enum_1.Routes.DELETE_CATEGORY, category_controller.deleteCategory);
exports.default = category_route;
//# sourceMappingURL=category_route.js.map