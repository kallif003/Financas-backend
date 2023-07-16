"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = exports.Routes = void 0;
var Routes;
(function (Routes) {
    Routes["GET_USERS"] = "/users";
    Routes["GET_USER_BY_USERNAME"] = "/api/user/by-username";
    Routes["GET_ALL_USERNAMES"] = "/user/all";
    Routes["SAVE_USER"] = "/api/user/save";
    Routes["UPDATE_USER"] = "/user/update/:id";
    Routes["DELETE_USER"] = "/user/:id";
    Routes["LOGIN"] = "/api/login";
    Routes["PAYLOAD"] = "/api/payload";
    Routes["REFRESH_TOKEN"] = "/refresh_token";
})(Routes = exports.Routes || (exports.Routes = {}));
var Permissions;
(function (Permissions) {
    Permissions["USER"] = "USER";
})(Permissions = exports.Permissions || (exports.Permissions = {}));
//# sourceMappingURL=enum.js.map