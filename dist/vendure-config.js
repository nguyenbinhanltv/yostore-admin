"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const core_1 = require("@vendure/core");
const email_plugin_1 = require("@vendure/email-plugin");
const asset_server_plugin_1 = require("@vendure/asset-server-plugin");
const admin_ui_plugin_1 = require("@vendure/admin-ui-plugin");
const path_1 = __importDefault(require("path"));
const mollie_plugin_1 = require("./mollie-payment/mollie.plugin");
const email_handlers_1 = require("./email/email.handlers");
const custom_stock_allocation_strategy_1 = require("./stock-allocation/custom-stock-allocation.strategy");
const channel_config_plugin_1 = require("./channel-config/channel-config.plugin");
const analytics_plugin_1 = require("./analytics/analytics.plugin");
const vendure_plugin_webhook_1 = require("vendure-plugin-webhook");
const vendure_plugin_public_stock_1 = require("vendure-plugin-public-stock");
exports.config = {
    orderOptions: {
        stockAllocationStrategy: new custom_stock_allocation_strategy_1.CustomStockAllocationStrategy()
    },
    workerOptions: {
        runInMainProcess: true,
    },
    apiOptions: {
        port: process.env.PORT || 3000,
        adminApiPath: 'admin-api',
        adminApiPlayground: {},
        adminApiDebug: false,
        shopApiPath: 'shop-api',
        shopApiPlayground: {},
        shopApiDebug: false,
    },
    authOptions: {
        superadminCredentials: {
            identifier: 'yostoreadmin',
            password: process.env.YOSTORE_PASS
        },
        tokenMethod: 'bearer',
    },
    dbConnectionOptions: {
        type: 'postgres',
        synchronize: false,
        logging: false,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        migrations: [path_1.default.join(__dirname, '../migrations/*.ts')],
    },
    paymentOptions: {
        paymentMethodHandlers: [],
    },
    customFields: {},
    plugins: [
        vendure_plugin_webhook_1.WebhookPlugin.init({
            httpMethod: 'POST',
            delay: 3000,
            events: [core_1.ProductEvent, core_1.ProductVariantChannelEvent, core_1.ProductVariantEvent]
        }),
        vendure_plugin_public_stock_1.PublicStockPlugin,
        mollie_plugin_1.MolliePlugin,
        channel_config_plugin_1.ChannelConfigPlugin,
        analytics_plugin_1.AnalyticsPlugin,
        asset_server_plugin_1.AssetServerPlugin.init({
            storageStrategyFactory: asset_server_plugin_1.configureS3AssetStorage({
                bucket: 'yostore-assets',
                credentials: {
                    accessKeyId: process.env.AAAWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AAAWS_SECRET_ACCESS_KEY,
                },
            }),
            route: 'assets',
            assetUploadDir: path_1.default.join(__dirname, 'assets'),
            port: 3001,
        }),
        core_1.DefaultJobQueuePlugin,
        core_1.DefaultSearchPlugin,
        email_plugin_1.EmailPlugin.init({
            transport: {
                type: 'smtp',
                host: 'smtp.zoho.eu',
                port: 587,
                secure: false,
                logging: true,
                debug: true,
                auth: {
                    user: 'noreply@yostore.studio',
                    pass: process.env.YOSTOREMAIL_PASS,
                }
            },
            handlers: email_handlers_1.shopsMailHandlers,
            templatePath: path_1.default.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                fromAddress: '"Webshop" <noreply@yostore.studio>',
            },
        }),
        // Production ready, precompiled admin UI
        admin_ui_plugin_1.AdminUiPlugin.init({
            port: 3002,
            app: {
                path: path_1.default.join(__dirname, '__admin-ui/dist')
            },
        }),
    ],
};
