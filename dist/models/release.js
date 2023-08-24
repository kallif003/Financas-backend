"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const releaseSchema = new mongoose_1.default.Schema({
    category: {
        type: String,
        required: true,
        trim: true,
    },
    destinedValue: {
        type: Number,
        required: true,
    },
    release: {
        type: (Array),
        required: true,
    },
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
});
const ReleaseModel = mongoose_1.default.model("release", releaseSchema);
exports.default = ReleaseModel;
//# sourceMappingURL=release.js.map