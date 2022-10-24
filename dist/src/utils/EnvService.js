"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnvService {
    static getEnv(envName, envDefault) {
        return process.env[envName] || envDefault;
    }
}
exports.default = EnvService;
//# sourceMappingURL=EnvService.js.map