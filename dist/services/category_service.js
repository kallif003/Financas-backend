"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
const category_1 = __importDefault(require("../models/category"));
class CategoryService {
    static createCategoryService(name, value, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                const existingCategory = yield category_1.default.findOne({
                    name,
                    deleted: false,
                });
                if (existingCategory != null) {
                    throw new handleError_1.default("Essa categoria já existente", 409);
                }
                const category = new category_1.default({ name, value, userId });
                const savedCategory = yield category.save();
                return savedCategory;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static getCategoriesService(userId, skip, itemsPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = { userId, deleted: false };
                const categories = yield category_1.default.find(query)
                    .skip(skip)
                    .limit(itemsPerPage);
                if (categories.length == 0) {
                    throw new handleError_1.default("Não há registros para essa busca", 404);
                }
                const totalCategories = yield category_1.default.find(query).count();
                const totalPages = Math.ceil(totalCategories / itemsPerPage);
                return { categories, totalPages };
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static getNameOfAllCategoriesService(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield category_1.default.find({ userId, deleted: false }, "_id name").exec();
                const formattedCategories = categories.map((category) => ({
                    id: category._id.toString(),
                    name: category.name,
                }));
                return formattedCategories;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getCategoryByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_1.default.findById(id);
                return category;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = CategoryService;
//# sourceMappingURL=category_service.js.map