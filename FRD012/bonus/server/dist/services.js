"use strict";
exports.__esModule = true;
exports.imageService = exports.logService = void 0;
var db_1 = require("./db");
var image_service_1 = require("./image-service");
var log_service_1 = require("./log-service");
exports.logService = new log_service_1.LogService(db_1.knex);
exports.imageService = new image_service_1.ImageService(db_1.knex);
