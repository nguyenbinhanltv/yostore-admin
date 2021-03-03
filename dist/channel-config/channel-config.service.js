"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelConfigService = void 0;
const common_1 = require("@nestjs/common");
/**
 * In our multi-tenant environment, we need some additional config per channel.
 */
let ChannelConfigService = class ChannelConfigService {
    constructor() {
        this.channelConfig = [
            {
                channelName: 'de Pinelab Demo Shop',
                channelToken: 'demo',
                logoUrl: 'https://shop.marcdefotograaf.nl/marcdefotograaf.png',
                supportEmail: 'martijn@pinelab.studio'
            }, {
                channelName: 'Marc de Fotograaf',
                channelToken: 'marcdefotograaf9283',
                logoUrl: 'https://shop.marcdefotograaf.nl/marcdefotograaf.png',
                supportEmail: 'info@marcdefotograaf.nl'
            }, {
                channelName: 'Ben de Boef',
                channelToken: 'bendeboef',
                logoUrl: 'https://pinelab-demo-shop.netlify.app/bendeboeflogo.png',
                supportEmail: 'martijn@pinelab.studio'
            }, {
                channelName: 'Daniel van de Haterd',
                channelToken: 'danielvdhaterd',
                logoUrl: 'https://dvandehaterd.nl/logo.png',
                supportEmail: 'daniel@dertienhoog.nl'
            }
        ];
    }
    async getConfig(channelToken) {
        const config = this.channelConfig.find(c => c.channelToken === channelToken);
        if (!config) {
            throw Error(`No config found for channel ${channelToken}`);
        }
        return config;
    }
};
ChannelConfigService = __decorate([
    common_1.Injectable()
], ChannelConfigService);
exports.ChannelConfigService = ChannelConfigService;
