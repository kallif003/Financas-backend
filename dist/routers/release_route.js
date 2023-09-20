"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const releases_controller_1 = __importDefault(require("../controllers/releases_controller"));
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const release_route = express_1.default.Router();
const releases_controller = new releases_controller_1.default();
release_route
    .post(enum_1.Routes.GET_RELEASES, releases_controller.getAllReleases)
    .post(enum_1.Routes.SAVE_RELEASE, releases_controller.createRelease)
    .patch(enum_1.Routes.DELETE_RELEASE, releases_controller.deleteRelease)
    .patch(enum_1.Routes.UPDATE_RELEASE, releases_controller.updateRelease);
exports.default = release_route;
//# sourceMappingURL=release_route.js.map