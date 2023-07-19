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
const salary_1 = __importDefault(require("../models/salary"));
class SalaryService {
    static registerSalaryService(value, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salary = yield salary_1.default.findOne({ userId });
                salary.value = value;
                yield salary.save();
                return "Salário registrado com sucesso";
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getSalaryService(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salary = yield salary_1.default.findOne({ userId });
                return salary;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = SalaryService;
//# sourceMappingURL=salary_service.js.map