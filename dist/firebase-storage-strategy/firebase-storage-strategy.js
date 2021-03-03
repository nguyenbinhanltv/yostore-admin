"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseStorageStrategy = void 0;
const admin = __importStar(require("firebase-admin"));
const tmp = __importStar(require("tmp"));
const fs = __importStar(require("fs"));
class FirebaseStorageStrategy {
    constructor(bucketName) {
        this.bucketName = bucketName;
        this.urlPrefix = 'https://firebasestorage.googleapis.com';
        this.storage = admin.storage();
    }
    toAbsoluteUrl(request, identifier) {
        var _a;
        if (((_a = request.vendureRequestContext) === null || _a === void 0 ? void 0 : _a._apiType) === 'admin') { // go via assetServer if admin
            return `${request.protocol}://${request.get('host')}/assets/${identifier}`;
        }
        return `${this.urlPrefix}/${this.bucketName}/${identifier}`;
    }
    async deleteFile(identifier) {
        await this.storage.bucket(this.bucketName).file(identifier).delete();
    }
    async fileExists(fileName) {
        const [exists] = await this.storage.bucket(this.bucketName).file(fileName).exists();
        return exists;
    }
    async readFileToBuffer(identifier) {
        if (identifier === null || identifier === void 0 ? void 0 : identifier.startsWith('/')) {
            identifier = identifier.replace('/', '');
        }
        const tmpFile = tmp.fileSync();
        await this.storage.bucket(this.bucketName).file(identifier).download({ destination: tmpFile.name });
        return fs.readFileSync(tmpFile.name);
    }
    async readFileToStream(identifier) {
        if (identifier === null || identifier === void 0 ? void 0 : identifier.startsWith('/')) {
            identifier = identifier.replace('/', '');
        }
        return this.storage.bucket(this.bucketName).file(identifier).createReadStream();
    }
    async writeFileFromBuffer(fileName, data) {
        const tmpFile = tmp.fileSync();
        fs.writeFileSync(tmpFile.name, data);
        await this.storage.bucket(this.bucketName).upload(tmpFile.name, {
            destination: fileName
        });
        return fileName;
    }
    async writeFileFromStream(fileName, data) {
        const blob = this.storage.bucket(this.bucketName).file(fileName);
        const uploadStream = blob.createWriteStream();
        await Promise.all([this.streamToPromise(data.pipe(uploadStream)), this.streamToPromise(uploadStream)]);
        return fileName;
    }
    streamToPromise(stream) {
        return new Promise(function (resolve, reject) {
            stream.on('end', resolve);
            stream.on('finish', resolve);
            stream.on('close', resolve);
            stream.on('error', reject);
        });
    }
}
exports.FirebaseStorageStrategy = FirebaseStorageStrategy;
