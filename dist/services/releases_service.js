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
const release_1 = __importDefault(require("../models/release"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
const pagination_service_1 = __importDefault(require("./pagination_service"));
class ReleasesService extends pagination_service_1.default {
    static createReleasesSerivce(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, destinedValue, userId, idRelease, name, value, date, locale, createdAt, } = data;
                const release = {
                    idRelease,
                    name,
                    value,
                    locale,
                    date: date,
                };
                let existingRelease = yield release_1.default.findOne({ category, createdAt });
                if (!existingRelease) {
                    existingRelease = new release_1.default({
                        category,
                        destinedValue,
                        userId,
                        createdAt,
                        release: [release],
                    });
                }
                else {
                    existingRelease.release.push(release);
                }
                return yield existingRelease.save();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getAllReleaseService(userId, skip, itemsPerPage, createdAt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = { userId, createdAt, deleted: false };
                return yield this.getPaginatedItems(query, skip, itemsPerPage, release_1.default);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static deleteReleaseService(userId, category, idRelease) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const release = yield release_1.default.findOne({ userId, category });
                release.release = release.release.filter((r) => r.idRelease != idRelease);
                return yield release.save();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static updateReleaseService(userId, idRelease, id, category, release) {
        return __awaiter(this, void 0, void 0, function* () {
            let updateRelease = {};
            for (const key in release) {
                if (release[key]) {
                    updateRelease = Object.assign(Object.assign({}, updateRelease), { [key]: release[key] });
                }
            }
            const releases = yield release_1.default.findOne({ userId, category });
            Object.assign(releases.release.find((r) => r.idRelease == idRelease), updateRelease);
            const update = yield release_1.default.findByIdAndUpdate(id, {
                release: releases.release,
            });
            return update;
        });
    }
}
exports.default = ReleasesService;
//# sourceMappingURL=releases_service.js.map