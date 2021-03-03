"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomStockAllocationStrategy = void 0;
/**
 * Only allocate stock to orders when PaymentSettled
 */
class CustomStockAllocationStrategy {
    shouldAllocateStock(ctx, fromState, toState, order) {
        return toState === 'PaymentSettled';
    }
}
exports.CustomStockAllocationStrategy = CustomStockAllocationStrategy;
