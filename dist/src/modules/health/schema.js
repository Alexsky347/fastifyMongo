"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthSchema = void 0;
exports.getHealthSchema = {
    summary: 'health check',
    description: 'health check',
    response: {
        200: {
            type: 'object',
            properties: {
                status: {
                    type: 'string'
                }
            }
        }
    }
};
//# sourceMappingURL=schema.js.map