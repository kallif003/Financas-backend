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
class PaginationService {
    static getPaginatedItems(query, skip, itemsPerPage, model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield model.find(query).skip(skip).limit(itemsPerPage);
                if (items.length === 0) {
                    throw new handleError_1.default("Não há registros para essa busca", 404);
                }
                const totalItems = yield model.find(query).count();
                const totalPages = Math.ceil(totalItems / itemsPerPage);
                return { items, totalPages };
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
}
exports.default = PaginationService;
//# sourceMappingURL=pagination_service.js.map