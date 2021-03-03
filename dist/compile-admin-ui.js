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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_1 = require("@vendure/ui-devkit/compiler");
const path = __importStar(require("path"));
const vendure_plugin_webhook_1 = require("vendure-plugin-webhook");
(_b = (_a = compiler_1.compileUiExtensions({
    outputPath: path.join(__dirname, '__admin-ui'),
    extensions: [vendure_plugin_webhook_1.webhookAdminUi]
})).compile) === null || _b === void 0 ? void 0 : _b.call(_a).then(() => {
    process.exit(0);
});
