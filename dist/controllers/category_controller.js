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
const category_service_1 = __importDefault(require("../services/category_service"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
class CategoryController {
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, value } = req.body;
                const { id } = req.params;
                const category = yield category_service_1.default.createCategoryService(name, value, id);
                return res.status(201).json(category);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, itemsPerPage } = req.body;
                const { id } = req.params;
                const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);
                const categories = yield category_service_1.default.getCategoriesService(id, skip, itemsPerPage);
                return res.status(200).json(categories);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getNameOfAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const categories = yield category_service_1.default.getNameOfAllCategoriesService(id);
                return res.status(200).json(categories);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const category = yield category_service_1.default.getCategoryByIdService(id);
                return res.status(200).json(category);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { userId, name, value } = req.body;
                const { id } = req.params;
                if (name) {
                    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                }
                const category = yield category_service_1.default.updateCattegoryService([{ userId, name, value }], id);
                return res.status(204).json("updated category");
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield category_service_1.default.deleteCategoryService(id);
                return res.status(204).json("deleted category");
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category_controller.js.map