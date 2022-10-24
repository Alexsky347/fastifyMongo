"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
function healthHandler(server, options, next) {
    server.get('/', { schema: schema_1.getHealthSchema }, (req, res) => {
        res.send({ status: 'ok' });
    });
    next();
}
exports.default = healthHandler;
//# sourceMappingURL=routes.js.map