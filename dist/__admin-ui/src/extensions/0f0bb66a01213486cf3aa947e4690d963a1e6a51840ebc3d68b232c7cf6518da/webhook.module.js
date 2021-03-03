"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookModule = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const core_2 = require("@vendure/admin-ui/core");
const webhook_component_1 = require("./webhook.component");
let WebhookModule = class WebhookModule {
};
WebhookModule = __decorate([
    core_1.NgModule({
        imports: [
            core_2.SharedModule,
            router_1.RouterModule.forChild([{
                    path: '',
                    pathMatch: 'full',
                    component: webhook_component_1.WebhookComponent,
                    data: { breadcrumb: 'Webhook' },
                }]),
        ],
        providers: [
            core_2.addNavMenuItem({
                id: 'webhook',
                label: 'Webhook',
                routerLink: ['/extensions/webhook'],
                icon: 'cursor-hand-open',
            }, 'settings'),
        ],
        declarations: [webhook_component_1.WebhookComponent],
    })
], WebhookModule);
exports.WebhookModule = WebhookModule;
