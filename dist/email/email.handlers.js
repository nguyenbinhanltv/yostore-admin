"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopsMailHandlers = exports.orderConfirmationHandler = void 0;
const email_plugin_1 = require("@vendure/email-plugin");
const core_1 = require("@vendure/core");
const tax_helper_1 = require("../tax/tax.helper");
const channel_config_service_1 = require("../channel-config/channel-config.service");
exports.orderConfirmationHandler = new email_plugin_1.EmailEventListener('order-confirmation')
    .on(core_1.OrderStateTransitionEvent)
    .filter(event => event.toState === 'PaymentSettled' && event.fromState !== 'Modifying' && !!event.order.customer)
    .loadData(async ({ event, injector }) => {
    const config = await injector.get(channel_config_service_1.ChannelConfigService).getConfig(event.ctx.channel.token);
    return { config };
})
    .setRecipient(event => { var _a; return `${event.order.customer.emailAddress},${(_a = event.data.config) === null || _a === void 0 ? void 0 : _a.supportEmail}`; })
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`Bedankt voor je bestelling bij {{ channelName }} met nr. {{ order.code }}`)
    .setTemplateVars(event => {
    const summary = tax_helper_1.TaxHelper.getTaxSummary(event.order);
    return Object.assign({ order: event.order, summary }, (event.data.config ? event.data.config : {}));
});
exports.shopsMailHandlers = [
    exports.orderConfirmationHandler
];
