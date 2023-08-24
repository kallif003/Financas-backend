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
const pagination_service_1 = __importDefault(require("./pagination_service"));
class CategoryService extends pagination_service_1.default {
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
                return yield this.getPaginatedItems(query, skip, itemsPerPage, category_1.default);
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
                const categories = yield category_1.default.find({ userId, deleted: false }, "_id name value").exec();
                const formattedCategories = categories.map((category) => ({
                    id: category._id.toString(),
                    name: category.name,
                    destinedValue: category.value,
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
    static updateCattegoryService(updateData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCategory = yield category_1.default.find({
                    userId: updateData[0].userId,
                    name: updateData[0].name,
                    deleted: false,
                });
                if (existingCategory.length > 0) {
                    throw new handleError_1.default("Essa categoria já existe", 409);
                }
                let category = (yield category_1.default.findById(id));
                for (const key in updateData[0]) {
                    const value = updateData[0][key];
                    if (value)
                        category[key] = value;
                }
                const updateCategory = yield category.save();
                return updateCategory;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static deleteCategoryService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const category = yield category_1.default.findByIdAndUpdate(id, {
                    deleted: true,
                    deletedAt: currentDate,
                }, { new: true });
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