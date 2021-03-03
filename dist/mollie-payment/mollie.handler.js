"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.molliePaymentHandler = void 0;
const core_1 = require("@vendure/core");
const generated_types_1 = require("@vendure/common/lib/generated-types");
const mollie_helper_1 = require("./mollie.helper");
const api_client_1 = __importDefault(require("@mollie/api-client"));
exports.molliePaymentHandler = new core_1.PaymentMethodHandler({
    code: 'mollie-payment-handler',
    description: [{
            languageCode: generated_types_1.LanguageCode.en,
            value: 'Mollie payment',
        }],
    args: {
        channelKeys: {
            type: 'string', list: true, description: [{
                    languageCode: generated_types_1.LanguageCode.en,
                    value: 'Use this format: CHANNELTOKEN=MOLLIEKEY,REDIRECT_URL',
                }]
        }
    },
    /** This is called when the `addPaymentToOrder` mutation is executed */
    createPayment: async (ctx, order, amount, args, metadata) => {
        try {
            let { apiKey, host } = mollie_helper_1.MollieHelper.getConfig(args.channelKeys, metadata.channel);
            if (host && !host.endsWith('/')) {
                host = `${host}/`; // append slash if
            }
            const mollieClient = api_client_1.default({ apiKey });
            const payment = await mollieClient.payments.create({
                amount: {
                    value: `${(order.totalWithTax / 100).toFixed(2)}`,
                    currency: 'EUR',
                },
                metadata: {
                    orderCode: order.code
                },
                description: `Bestelling ${order.code}`,
                redirectUrl: `${host}order/${order.code}`,
                webhookUrl: `${process.env.VENDURE_HOST}/payments/mollie/${metadata.channel}`
            });
            return {
                amount: order.totalWithTax,
                transactionId: payment.id,
                state: 'Authorized',
                metadata: {
                    public: {
                        redirectLink: payment.getPaymentUrl(),
                    }
                },
            };
        }
        catch (err) {
            return {
                amount: order.totalWithTax,
                state: 'Declined',
                metadata: {
                    errorMessage: err.message,
                },
            };
        }
    },
    /** This is called when the `settlePayment` mutation is executed */
    settlePayment: async (order, payment, args) => {
        try {
            // do something
            return { success: true };
        }
        catch (err) {
            return {
                success: false,
                errorMessage: err.message,
            };
        }
    },
});
