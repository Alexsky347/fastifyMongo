"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EnvService_1 = __importDefault(require("../utils/EnvService"));
class DB {
    static init() {
        return mongoose_1.default.connect(`mongodb://${EnvService_1.default.getEnv("MONGO_HOST", "localhost")}:${EnvService_1.default.getEnv("MONGO_PORT", 27017)}/${EnvService_1.default.getEnv("MONGO_DATABASE", "fastify")}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (!err) {
                console.log("MongoDB connection successful.");
            }
            else {
                console.log("Error in DB connection : " + JSON.stringify(err, undefined, 2));
            }
        });
    }
}
exports.default = DB;
//# sourceMappingURL=db.js.map