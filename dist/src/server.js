"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = __importDefault(require("./modules/health/routes"));
const routes_2 = __importDefault(require("./modules/products/routes"));
const cors_1 = __importDefault(require("@fastify/cors"));
const static_1 = require("@fastify/static");
const fastify_multer_1 = __importDefault(require("fastify-multer"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./plugins/db"));
const EnvService_1 = __importDefault(require("./utils/EnvService"));
const routes_3 = __importDefault(require("./modules/file/routes"));
const storage = fastify_multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/tmp/my-uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    },
});
class Server {
    /**
     *
     * @returns server
     */
    static createServer() {
        db_1.default.init();
        this.server = (0, fastify_1.default)();
        //cors
        this.server.register(cors_1.default);
        //static
        this.server.register(static_1.fastifyStatic, {
            root: path_1.default.join(__dirname, "public"),
            prefix: "/public/", // optional: default '/'
        });
        // register fastify content parser
        this.server.register(fastify_multer_1.default.contentParser);
        //this.initStorage();
        this.declareEndPoints();
        this.handleError();
        return this.server;
    }
    /**
     *
     */
    static declareEndPoints() {
        this.server.register(routes_1.default, { prefix: `${this.apiPrefix}/health` });
        this.server.register(routes_2.default, {
            prefix: `${this.apiPrefix}/product`,
        });
        this.server.register(routes_3.default, {
            prefix: `${this.apiPrefix}/file`,
        });
    }
    /**
     *
     */
    static handleError() {
        this.server.setErrorHandler((error, req, res) => {
            req.log.error(error.toString());
            res.send({ error });
        });
    }
    static checkFileType(file, cb) {
        const filetypes = /jpg|jpeg|png/; // Choose Types you want...
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        else {
            cb("Images only!"); // custom this message to fit your needs
        }
    }
}
exports.Server = Server;
Server.upload = (0, fastify_multer_1.default)({ storage: storage });
Server.apiPrefix = EnvService_1.default.getEnv("API_PREFIX", "api");
//# sourceMappingURL=server.js.map