"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var database_1 = require("./database");
exports.config = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000,
    DB: database_1.default,
};
//# sourceMappingURL=index.js.map