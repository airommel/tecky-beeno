"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.knex = void 0;
var knex_1 = __importDefault(require("knex"));
var env_1 = require("./env");
// import * as configs from './knexfile'
require("./knexfile");
var configs = require('./knexfile');
// @ts-ignore
var profile = configs[env_1.env.nodeEnv];
exports.knex = (0, knex_1["default"])(profile);
