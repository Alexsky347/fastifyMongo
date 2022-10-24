"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
const index_1 = require("../../dao/index");
function productHandler(server, options, next) {
    server.get('/', { schema: schema_1.listProductsSchema }, (req, res) => __awaiter(this, void 0, void 0, function* () {
        req.log.info('list products from db');
        const products = yield (0, index_1.getAllProducts)();
        res.send(products);
    }));
    server.get('/:_id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        req.log.info('get one products from db');
        const products = yield (0, index_1.getOneProduct)(req.params._id);
        res.status(200).send(products);
    }));
    server.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        req.log.info('Add products to db');
        const products = yield (0, index_1.createProduct)(req.body);
        res.status(201).send(products);
    }));
    server.put('/:_id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        req.log.info('Update product to db');
        const products = yield (0, index_1.updateProduct)(req.params._id, req.body);
        res.status(200).send(products);
    }));
    server.delete('/:_id', { schema: schema_1.deleteProductSchema }, (req, res) => __awaiter(this, void 0, void 0, function* () {
        req.log.info(`delete product ${req.params._id} from db`);
        yield (0, index_1.deleteProduct)(req.params._id);
        res.code(200).send('OK');
    }));
    next();
}
exports.default = productHandler;
//# sourceMappingURL=routes.js.map