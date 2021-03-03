"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const core_1 = require("@vendure/core");
const vendure_config_1 = require("./vendure-config");
const server = core_1.bootstrap(vendure_config_1.config);
server.then(() => {
    console.log(`\x1b[46mUsing database ${process.env.DATABASE_NAME} \x1b[0m`);
})
    .catch(err => {
    // tslint:disable-next-line:no-console
    console.log(err);
});
