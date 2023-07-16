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
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
class UserService {
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = userData;
                // Verifique se o username já existe no banco de dados
                const existingUser = yield users_1.default.findOne({
                    email,
                    deleted: false,
                });
                if (existingUser != null) {
                    throw new handleError_1.default("Email já existente", 409);
                }
                const saltRounds = 8;
                const hashedPassword = yield bcrypt_1.default.hash(userData.password, saltRounds);
                userData.password = hashedPassword;
                const newUser = new users_1.default(Object.assign({}, userData));
                const savedUser = yield newUser.save();
                return savedUser;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static updateUser(updatedData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let existingUser;
                if (updatedData[0].email) {
                    existingUser = yield users_1.default.findOne({
                        username: updatedData[0].email,
                        deleted: false,
                    });
                }
                if (existingUser != null) {
                    throw new handleError_1.default("Email já existente", 409);
                }
                let user = (yield users_1.default.findById(id));
                for (const key in updatedData[0]) {
                    const value = updatedData[0][key];
                    if (value) {
                        user[key] = value;
                    }
                }
                const updatedUser = yield user.save();
                return updatedUser;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error("Usuário não encontrado");
            }
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const user = yield users_1.default.findByIdAndUpdate(userId, {
                    deleted: true,
                    deletedAt: currentDate,
                }, { new: true });
                return user;
            }
            catch (error) {
                throw new Error("Usuário não encontrado");
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user_service.js.map