"use strict";
exports.__esModule = true;
exports.env = void 0;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function ensure(key) {
    var value = process.env[key];
    if (!value) {
        throw new Error("missing ".concat(key, " environment variable"));
    }
    return value;
}
exports.env = {
    nodeEnv: ensure('NODE_ENV'),
    port: +ensure('PORT'),
    database: {
        host: ensure('POSTGRES_HOST'),
        port: +ensure('POSTGRES_PORT'),
        database: ensure('POSTGRES_DB'),
        user: ensure('POSTGRES_USER'),
        password: ensure('POSTGRES_PASSWORD')
    },
    aws: {
        accessKeyId: ensure('AWS_ACCESS_KEY_ID'),
        secretAccessKey: ensure('AWS_SECRET_ACCESS_KEY'),
        s3Region: ensure('AWS_S3_REGION'),
        s3Bucket: ensure('AWS_S3_BUCKET')
    }
};
