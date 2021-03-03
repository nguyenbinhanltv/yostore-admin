"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: process.env.SHOP_ENV });
const core_1 = require("@vendure/core");
const vendure_config_1 = require("./vendure-config");
const localtunnel_1 = __importDefault(require("localtunnel"));
/**
 * Dev env settings
 */
(async () => {
    const tunnel = await localtunnel_1.default({ port: 3000 });
    // the assigned public url for your tunnel
    process.env.VENDURE_HOST = tunnel.url;
    console.log('Localtunnel set up', tunnel.url);
    tunnel.on('close', () => {
        console.error('tunnel closed');
    });
})();
core_1.bootstrap(vendure_config_1.config)
    .then(() => {
    console.log(`\x1b[46mUsing database ${process.env.DATABASE_NAME} \x1b[0m`);
})
    .catch(err => console.error(err));
