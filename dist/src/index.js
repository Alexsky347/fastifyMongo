"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const EnvService_1 = __importDefault(require("./utils/EnvService"));
const server = server_1.Server.createServer();
server.listen({
    port: EnvService_1.default.getEnv("PORT", 3000),
    host: EnvService_1.default.getEnv("HOST", "localhost"),
}, (err, address) => {
    if (err)
        throw err;
    console.log(`server listening on ${address}`);
});
module.exports = server;
//# sourceMappingURL=index.js.map