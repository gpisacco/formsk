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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const client_1 = require("@prisma/client");
const RequestParser_1 = require("./helpers/RequestParser");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const port = 8080; // default port to listen
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rp = new RequestParser_1.RequestParser(req.query);
    return res.status(200).json(yield prisma.product.findMany());
}));
app.get("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.findUnique({ where: { id: parseInt(req.params.id) } });
    return res.status(200).json(product);
}));
app.put("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.create({ data: req.body });
    return res.status(200).json(product);
}));
app.delete("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.product.delete({ where: { id: parseInt(req.params.id) } });
    return res.status(204).send('');
}));
//# sourceMappingURL=index.js.map