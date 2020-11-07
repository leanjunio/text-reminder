"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var index_1 = require("./routes/index");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
index_1.routeConfig(app);
exports.default = {
    listen: function (port) { return app.listen(port, function () { return console.log("Running on port: " + port); }); },
};
//# sourceMappingURL=app.js.map