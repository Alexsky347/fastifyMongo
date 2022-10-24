"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductSchema = exports.listProductsSchema = exports.productSchema = void 0;
exports.productSchema = {
    _id: { type: "string", format: "uuid" },
    name: { type: "string" },
    unit: { type: "number" },
    category: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
};
exports.listProductsSchema = {
    summary: "products",
    description: "products",
    response: {
        200: {
            type: "array",
            items: {
                properties: exports.productSchema,
            },
        },
    },
};
exports.deleteProductSchema = {
    summary: "delete product",
    description: "delete product",
    params: {
        type: "object",
        required: ["_id"],
        properties: {
            _id: { type: "string" },
        },
    },
    response: {
        200: {
            type: "boolean",
        },
    },
};
//# sourceMappingURL=schema.js.map