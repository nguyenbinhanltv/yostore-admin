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
exports.WebhookComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const core_2 = require("@vendure/admin-ui/core");
const queries_1 = require("./queries");
let WebhookComponent = class WebhookComponent {
    constructor(route, router, serverConfigService, formBuilder, dataService, changeDetector, notificationService) {
        this.formBuilder = formBuilder;
        this.dataService = dataService;
        this.changeDetector = changeDetector;
        this.notificationService = notificationService;
        this.webhookForm = this.formBuilder.group({
            url: ['https://example.com', forms_1.Validators.required],
        });
    }
    async ngOnInit() {
        await this.dataService.query(queries_1.getWebhookQuery)
            .mapStream((d) => d.webhook)
            .subscribe(webhook => this.webhookForm.controls['url'].setValue(webhook));
    }
    async save() {
        console.log('SAVEDDD', this.webhookForm.value.url);
        try {
            if (this.webhookForm.dirty) {
                const formValue = this.webhookForm.value;
                await this.dataService.mutate(queries_1.updateWebhookMutation, { url: formValue.url }).toPromise();
            }
            this.webhookForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.notificationService.success('common.notify-update-success', {
                entity: 'Webhook',
            });
        }
        catch (e) {
            this.notificationService.error('common.notify-update-error', {
                entity: 'Webhook',
            });
        }
    }
};
WebhookComponent = __decorate([
    core_1.Component({
        selector: 'greeter',
        templateUrl: './webhook.component.html',
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        core_2.ServerConfigService,
        forms_1.FormBuilder,
        core_2.DataService,
        core_1.ChangeDetectorRef,
        core_2.NotificationService])
], WebhookComponent);
exports.WebhookComponent = WebhookComponent;
