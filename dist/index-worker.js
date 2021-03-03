"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@vendure/core");
const vendure_config_1 = require("./vendure-config");
core_1.bootstrapWorker(vendure_config_1.config).catch(err => {
    // tslint:disable-next-line:no-console
    console.log(err);
});
