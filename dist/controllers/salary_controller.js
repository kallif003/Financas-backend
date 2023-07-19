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
const salary_service_1 = __importDefault(require("../services/salary_service"));
class SalaryController {
    registerSalary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { value } = req.body;
                const { id } = req.params;
                const salary = yield salary_service_1.default.registerSalaryService(value, id);
                return res.status(201).json(salary);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getSalarary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const salary = yield salary_service_1.default.getSalaryService(id);
                return res.status(200).json(salary);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
}
exports.default = SalaryController;
//# sourceMappingURL=salary_controller.js.map