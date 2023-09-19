"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const salary_route_1 = __importDefault(require("./salary_route"));
const category_route_1 = __importDefault(require("./category_route"));
const release_route_1 = __importDefault(require("./release_route"));
const middleware_1 = require("../middleware");
const cors_1 = __importDefault(require("cors"));
const router = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send("SaveMoney Backend Ativo");
    });
    app.use(express_1.default.json(), (0, cors_1.default)(), middleware_1.cacheControlMiddleware, middleware_1.verifyToken, salary_route_1.default, category_route_1.default, release_route_1.default);
};
exports.default = router;
//# sourceMappingURL=index.js.map