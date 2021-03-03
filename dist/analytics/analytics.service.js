"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const typeorm_1 = require("typeorm");
const channel_config_service_1 = require("../channel-config/channel-config.service");
const common_1 = require("@nestjs/common");
const core_1 = require("@vendure/core");
let AnalyticsService = class AnalyticsService {
    constructor(connection, channelService) {
        this.connection = connection;
        this.channelService = channelService;
    }
    /**
     * Send an email to all Most sold products (1, 2 and 3), Average order value, Shopping cart abandonment rate, Recurring customers
     */
    async sendMonthlyEmail() {
        console.log(`Sending analytics email to all channel owners.`);
        const startOfLastMonth = new Date();
        startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
        startOfLastMonth.setDate(1);
        startOfLastMonth.setHours(0);
        startOfLastMonth.setMinutes(0);
        startOfLastMonth.setSeconds(0);
        const endOfLastMonth = new Date(startOfLastMonth.getTime());
        endOfLastMonth.setMonth(endOfLastMonth.getMonth() + 1);
        const channels = await this.connection
            .getRepository(core_1.Channel)
            .createQueryBuilder('channel')
            .getMany();
        for (const channel of channels) {
            const config = await this.channelService.getConfig(channel.token).catch(e => console.error(e));
            if (!(config === null || config === void 0 ? void 0 : config.supportEmail)) {
                console.error(`Not sending analytics email for channel ${channel.token} because no support email was found`);
                continue;
            }
            const data = await this.getBasicAnalytis({
                channelId: channel.id,
                channelName: config.channelName,
                from: startOfLastMonth,
                to: endOfLastMonth
            });
            console.log(`Analytics: `, data);
        }
    }
    async getBasicAnalytis(parameters) {
        const monthName = parameters.from.toLocaleString('nl-NL', { month: 'long' });
        console.log(`Getting analytics for channel ${parameters.channelName} for month ${monthName}`);
        const orders = await this.connection
            .getRepository(core_1.Order)
            .createQueryBuilder('order')
            .leftJoin('order.channels', 'channel')
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('customer.user', 'user') // Used in de 'Order' query, guess this didn't work before?
            .leftJoinAndSelect('order.lines', 'lines')
            .leftJoinAndSelect('lines.productVariant', 'productVariant')
            .leftJoinAndSelect('productVariant.productVariantPrices', 'prices')
            .leftJoinAndSelect('productVariant.product', 'product')
            .leftJoinAndSelect('product.translations', 'productTranslations')
            .leftJoinAndSelect('lines.featuredAsset', 'featuredAsset')
            .leftJoinAndSelect('lines.items', 'items')
            .where('channel.id = :channelId', { channelId: parameters.channelId })
            .andWhere('order.createdAt > :from', { from: parameters.from })
            .andWhere('order.createdAt < :to', { to: parameters.to })
            .getMany();
        let totalRevenue = 0;
        let newCustomers = 0;
        let recurringCustomers = 0;
        let finishedOrders = 0;
        let abandonedOrders = 0;
        const products = [];
        orders.forEach(order => {
            var _a;
            if (order.state === 'Delivered' || order.state === 'PaymentSettled' || order.state === 'Shipped') {
                finishedOrders++;
                totalRevenue += order.total;
                if (((_a = order.customer) === null || _a === void 0 ? void 0 : _a.createdAt) >= parameters.from) {
                    newCustomers++;
                }
                else if (order.customer) {
                    recurringCustomers++;
                }
                order.lines.forEach(line => {
                    var _a, _b, _c, _d;
                    const productName = (_d = (_c = (_b = (_a = line.productVariant) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.translations) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.name;
                    if (!productName) {
                        return;
                    }
                    const product = products.find(p => p.name === productName) || {
                        name: productName,
                        totalRevenue: 0,
                        timesSold: 0
                    };
                    product.totalRevenue += line.linePriceWithTax;
                    product.timesSold += line.quantity;
                });
            }
            else { // created but not paid
                abandonedOrders++;
            }
        });
        const bestSoldProducts = products
            .sort((p1, p2) => p1.totalRevenue - p2.totalRevenue)
            .slice(0, 3);
        return {
            shopOwnerName: parameters.channelName,
            month: monthName,
            totalRevenue,
            bestSoldProducts,
            averageOrderValue: totalRevenue / finishedOrders,
            cartAbandonmentRate: (abandonedOrders / orders.length) * 100,
            newCustomers,
            recurringCustomers
        };
    }
};
AnalyticsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection, channel_config_service_1.ChannelConfigService])
], AnalyticsService);
exports.AnalyticsService = AnalyticsService;
