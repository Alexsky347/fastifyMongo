"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
function fileHandler(server, options, next) {
    server.post('/addSingle', { preHandler: server_1.Server.upload.single('avatar') }, (req, res) => {
        res.code(200).send('SUCCESS');
    });
    server.post('/addMultiple', { preHandler: server_1.Server.upload.array('avatar') }, (req, res) => {
        res.code(200).send('SUCCESS');
    });
    next();
}
exports.default = fileHandler;
//# sourceMappingURL=routes.js.map