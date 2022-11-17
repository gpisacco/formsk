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
exports.deleteProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const RequestParser_1 = require("./helpers/RequestParser");
const getProducts = (prisma) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rp = new RequestParser_1.RequestParser(req.query);
    return res.status(200).json(yield prisma.product.findMany(rp.build()));
});
exports.getProducts = getProducts;
const getProduct = (prisma) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.findUnique({ where: { id: parseInt(req.params.id) } });
    return res.status(200).json(product);
});
exports.getProduct = getProduct;
const createProduct = (prisma) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.create({ data: req.body });
    return res.status(200).json(product);
});
exports.createProduct = createProduct;
const deleteProduct = (prisma) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.product.delete({ where: { id: parseInt(req.params.id) } });
    return res.status(204).send('');
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=logic.js.map