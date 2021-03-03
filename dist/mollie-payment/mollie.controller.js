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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MollieController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@vendure/core");
const mollie_helper_1 = require("./mollie.helper");
const typeorm_1 = require("typeorm");
const api_client_1 = __importStar(require("@mollie/api-client"));
const payment_state_machine_1 = require("@vendure/core/dist/service/helpers/payment-state-machine/payment-state-machine");
let MollieController = class MollieController {
    constructor(orderService, connection, channelService, paymentStateMachine) {
        this.orderService = orderService;
        this.connection = connection;
        this.channelService = channelService;
        this.paymentStateMachine = paymentStateMachine;
    }
    async webhook(channelToken, body) {
        const ctx = await this.createContext(channelToken);
        console.log(`Received payment for ${channelToken}`);
        const { apiKey } = await mollie_helper_1.MollieHelper.getConfigAsync(channelToken, this.connection);
        const client = api_client_1.default({ apiKey });
        const molliePayment = await client.payments.get(body.id);
        console.log(`Payment for channel ${channelToken}, orderCode ${molliePayment.metadata.orderCode} has status ${molliePayment.status}`);
        // find payment in DB by id
        const dbPayment = await this.connection.getRepository(core_1.Payment).findOneOrFail({ where: { transactionId: molliePayment.id } });
        if (molliePayment.status === api_client_1.PaymentStatus.paid) {
            await this.orderService.settlePayment(ctx, dbPayment.id);
            console.log(`Payment for order ${molliePayment.metadata.orderCode} settled`);
        }
        else {
            const order = await this.orderService.findOneByCode(ctx, molliePayment.metadata.orderCode);
            await this.paymentStateMachine.transition(ctx, order, dbPayment, 'Declined');
            console.log(`Payment for order ${molliePayment.metadata.orderCode} declined!`);
        }
    }
    async createContext(channelToken) {
        const channel = await this.channelService.getChannelFromToken(channelToken);
        return new core_1.RequestContext({
            apiType: 'admin',
            isAuthorized: true,
            authorizedAsOwnerOnly: false,
            channel,
            languageCode: core_1.LanguageCode.en,
        });
    }
};
__decorate([
    common_1.Post('mollie/:channelToken'),
    __param(0, common_1.Param('channelToken')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MollieController.prototype, "webhook", null);
MollieController = __decorate([
    common_1.Controller('payments'),
    __metadata("design:paramtypes", [core_1.OrderService, typeorm_1.Connection, core_1.ChannelService, payment_state_machine_1.PaymentStateMachine])
], MollieController);
exports.MollieController = MollieController;
