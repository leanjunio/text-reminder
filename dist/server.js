"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var dotenv_1 = require("dotenv");
dotenv_1.default.config({ path: path_1.resolve(__dirname, '../.env') });
var app_1 = require("./app");
var config_1 = require("./config");
app_1.default.listen(config_1.config.PORT);
//# sourceMappingURL=server.js.map