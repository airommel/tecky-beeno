"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var multer_s3_1 = __importDefault(require("multer-s3"));
var env_1 = require("./env");
var s3 = new aws_sdk_1["default"].S3({
    accessKeyId: env_1.env.aws.accessKeyId,
    secretAccessKey: env_1.env.aws.secretAccessKey,
    region: env_1.env.aws.s3Region
});
var counter = 0;
var s3Storage = (0, multer_s3_1["default"])({
    s3: s3,
    bucket: env_1.env.aws.s3Bucket,
    metadata: function (req, file, cb) {
        console.log('s3 object metadata, file:', file);
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        console.log('s3 object key, file:', file);
        var now = Date.now();
        // image/jpeg or image/png
        var ext = file.mimetype.split('/').pop();
        counter++;
        var key = "".concat(file.fieldname, "-").concat(now, "-").concat(counter, ".").concat(ext);
        cb(null, key);
    }
});
var fileStorage = multer_1["default"].diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        var now = Date.now();
        // image/jpeg or image/png
        var ext = file.mimetype.split('/').pop();
        counter++;
        var filename = "".concat(file.fieldname, "-").concat(now, "-").concat(counter, ".").concat(ext);
        cb(null, filename);
    }
});
exports.upload = (0, multer_1["default"])({
    storage: env_1.env.nodeEnv === 'development' ? fileStorage : s3Storage
});
