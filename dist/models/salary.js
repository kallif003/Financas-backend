"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const salarySchema = new mongoose_1.default.Schema({
    value: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
    },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
});
const Salary = mongoose_1.default.model("salary", salarySchema);
exports.default = Salary;
//# sourceMappingURL=salary.js.map