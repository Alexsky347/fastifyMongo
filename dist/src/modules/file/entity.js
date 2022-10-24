"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const fileSchema = new Schema({
    username: { type: String, required: true },
    filename: { type: String, required: true },
    hash: { type: String, required: true },
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});
exports.default = mongoose_1.default.model("Files", fileSchema);
//# sourceMappingURL=entity.js.map