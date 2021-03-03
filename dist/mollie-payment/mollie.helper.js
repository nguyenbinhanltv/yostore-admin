"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MollieHelper = void 0;
const mollie_handler_1 = require("./mollie.handler");
const core_1 = require("@vendure/core");
class MollieHelper {
    /**
     * Get config from database arguments
     * ChannelKeys are formatted like this: 'channelToken=key_29h271jl839202,https://host.com'
     */
    static getConfig(channelKeys, channel) {
        if (!channelKeys || channelKeys.length === 0) {
            throw Error(`No channelKeys configured!`);
        }
        let config;
        channelKeys.find(channelKey => {
            const [ch, configString] = channelKey.split('=');
            if (channel === ch) {
                const [apiKey, host] = configString.split(',');
                config = { apiKey, host, channel };
                return true;
            }
        });
        if (!config) {
            throw Error(`No config found for channel ${channel}. Set apikey and redirectHost in admin UI.`);
        }
        return config;
    }
    /**
     * Queries the database to get PaymentMethod args
     */
    static async getConfigAsync(channel, connection) {
        var _a;
        const method = await connection.getRepository(core_1.PaymentMethod).findOne({
            where: {
                code: mollie_handler_1.molliePaymentHandler.code,
            },
        });
        const args = (_a = method === null || method === void 0 ? void 0 : method.configArgs) === null || _a === void 0 ? void 0 : _a.find(arg => arg.name === 'channelKeys');
        const channelKeys = (args === null || args === void 0 ? void 0 : args.value) ? JSON.parse(args === null || args === void 0 ? void 0 : args.value) : [];
        return this.getConfig(channelKeys, channel);
    }
}
exports.MollieHelper = MollieHelper;
