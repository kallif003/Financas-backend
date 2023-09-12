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
const releases_service_1 = __importDefault(require("../services/releases_service"));
class ReleasesController {
    createRelease(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, destinedValue, idRelease, name, value, date, locale, createdAt, } = req.body;
                const { id } = req.params;
                const release = yield releases_service_1.default.createReleasesSerivce({
                    category,
                    destinedValue,
                    idRelease,
                    name,
                    value,
                    date,
                    userId: id,
                    locale,
                    createdAt,
                });
                return res.status(201).json(release);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getAllReleases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, itemsPerPage, createdAt } = req.body;
                const { id } = req.params;
                const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);
                const releases = yield releases_service_1.default.getAllReleaseService(id, skip, itemsPerPage, createdAt);
                return res.status(200).json(releases);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    deleteRelease(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, idRelease } = req.body;
                const { id } = req.params;
                yield releases_service_1.default.deleteReleaseService(id, category, idRelease);
                res.status(204).send("deleted release");
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    updateRelease(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { releaseCategory, idRelease, idCategory, name, value, date, locale, } = req.body;
                const { id } = req.params;
                yield releases_service_1.default.updateReleaseService(id, idRelease, idCategory, releaseCategory, { name, value, date, locale });
                res.status(204).send("updated release");
            }
            catch (error) { }
        });
    }
}
exports.default = ReleasesController;
//# sourceMappingURL=releases_controller.js.map