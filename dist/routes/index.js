"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeConfig = void 0;
var http_status_codes_1 = require("http-status-codes");
var users_1 = require("./users");
exports.routeConfig = function (app) {
    app.get('/api/check', function (_, res) { return res.status(http_status_codes_1.default.OK).send('Health check'); });
    app.use('/users', users_1.default);
};
//# sourceMappingURL=index.js.map