"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsPlugin = void 0;
const core_1 = require("@vendure/core");
const analytics_controller_1 = require("./analytics.controller");
const channel_config_plugin_1 = require("../channel-config/channel-config.plugin");
const analytics_service_1 = require("./analytics.service");
/**
 * Basic analytics based on database orders.
 * Sends emails to channelAdministrators
 */
let AnalyticsPlugin = class AnalyticsPlugin {
};
AnalyticsPlugin = __decorate([
    core_1.VendurePlugin({
        imports: [core_1.PluginCommonModule, channel_config_plugin_1.ChannelConfigPlugin],
        controllers: [analytics_controller_1.AnalyticsController],
        providers: [analytics_service_1.AnalyticsService],
    })
], AnalyticsPlugin);
exports.AnalyticsPlugin = AnalyticsPlugin;
