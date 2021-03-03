"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebhookQuery = exports.updateWebhookMutation = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.updateWebhookMutation = graphql_tag_1.default `
    mutation updateWebhook($url: String!) {
        updateWebhook(url: $url)
    }
`;
exports.getWebhookQuery = graphql_tag_1.default `
    query webhook {
        webhook
    }
`;
