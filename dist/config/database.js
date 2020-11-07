"use strict";
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    HOST: (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : 'localhost',
    PORT: (_b = process.env.DB_PORT) !== null && _b !== void 0 ? _b : '27017',
    USER: (_c = process.env.DB_USER) !== null && _c !== void 0 ? _c : 'test',
    PASSWORD: (_d = process.env.DB_PASSWORD) !== null && _d !== void 0 ? _d : 'test',
    NAME: (_e = process.env.DB_NAME) !== null && _e !== void 0 ? _e : 'bob-nurse-motors',
    URI: '',
};
var uri = '';
if (config.USER && config.PASSWORD) {
    uri = (_f = process.env.DB_URI) !== null && _f !== void 0 ? _f : "mongodb://" + config.USER + ":" + config.PASSWORD + "@" + config.HOST + "/" + config.NAME;
}
config.URI = uri;
exports.default = config;
//# sourceMappingURL=database.js.map