"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importStar(require("express"));
const logic_1 = require("../src/logic");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
let server;
describe('GET /products', () => {
    it('should return 200 & valid response with a single value', () => {
        const expectedResult = [{
                "id": 1,
                "code": "HWR16-03",
                "position": 1,
                "quantity": 1,
                "image": "01.png",
                "description": "Upright for room designs incl. floor profile in stainless steel appearance, depth: 250 - 900 mm, edging on both sides, Plinth height 70 mm: 2253 mm Plinth height 100 mm: 2283 mm Plinth height 150 mm: 2333 mm Plinth height 200 mm: 2383 mm",
                "price": 500
            }];
        const getProducts1 = jest.fn((0, logic_1.getProducts)({
            product: {
                findMany: (c) => __awaiter(void 0, void 0, void 0, function* () {
                    return expectedResult;
                }),
            }
        }));
        const router = (0, express_1.Router)();
        router.get("/products", getProducts1);
        const app1 = (0, express_1.default)();
        app1.use('/', router);
        return (0, supertest_1.default)(app1)
            .get(`/products?code=HWR16-03`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
            expect(res.body).toMatchObject(expectedResult);
        });
    });
    it('should return 200 & valid response with a all values', () => {
        const expectedResult = [{
                "id": 1,
                "code": "HWR16-03",
                "position": 1,
                "quantity": 1,
                "image": "01.png",
                "description": "Upright for room designs incl. floor profile in stainless steel appearance, depth: 250 - 900 mm, edging on both sides, Plinth height 70 mm: 2253 mm Plinth height 100 mm: 2283 mm Plinth height 150 mm: 2333 mm Plinth height 200 mm: 2383 mm",
                "price": 500
            }];
        const getProducts1 = jest.fn((0, logic_1.getProducts)({
            product: {
                findMany: (c) => __awaiter(void 0, void 0, void 0, function* () {
                    return expectedResult;
                }),
            }
        }));
        const router = (0, express_1.Router)();
        router.get("/products", getProducts1);
        const app1 = (0, express_1.default)();
        app1.use('/', router);
        return (0, supertest_1.default)(app1)
            .get(`/products`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
            expect(res.body.length).toEqual(1);
        });
    });
    it('should return 200 & valid response with a new value', () => __awaiter(void 0, void 0, void 0, function* () {
        const value = {
            "code": "HWR16-04",
            "position": 1,
            "quantity": 1,
            "image": "01.png",
            "description": "Upright for room designs incl. floor profile in stainless steel appearance, depth: 250 - 900 mm, edging on both sides, Plinth height 70 mm: 2253 mm Plinth height 100 mm: 2283 mm Plinth height 150 mm: 2333 mm Plinth height 200 mm: 2383 mm",
            "price": 500
        };
        const createProduct1 = jest.fn((0, logic_1.createProduct)({
            product: {
                create: (c) => __awaiter(void 0, void 0, void 0, function* () {
                    value.id = 17;
                    return value;
                }),
            }
        }));
        const router = (0, express_1.Router)();
        router.put("/products", createProduct1);
        const app1 = (0, express_1.default)();
        app1.use(body_parser_1.default.json());
        app1.use(body_parser_1.default.urlencoded({ extended: true }));
        app1.use((0, cors_1.default)());
        app1.use('/', router);
        return (0, supertest_1.default)(app1)
            .put(`/products`)
            .send(value)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
            expect(res.body.id).toEqual(17);
        });
    }));
    it('should return 200 & valid projected response', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResult = [{
                "id": 1,
                "code": "HWR16-04"
            }];
        const getProducts1 = jest.fn((0, logic_1.getProducts)({
            product: {
                findMany: (c) => __awaiter(void 0, void 0, void 0, function* () {
                    expect(c.select).not.toBeUndefined();
                    expect(c.select.code).toBeTruthy();
                    expect(c.select.id).toBeTruthy();
                    return expectedResult;
                }),
            }
        }));
        const router = (0, express_1.Router)();
        router.get("/products", getProducts1);
        const app1 = (0, express_1.default)();
        app1.use('/', router);
        return (0, supertest_1.default)(app1)
            .get(`/products?projection=code,id`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
            expect(res.body[0].position).toBeUndefined();
        });
    }));
    it('should return 200 & valid sorted response', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResult = [{
                "id": 2,
                "code": "HWR16-04",
                "position": 1,
                "quantity": 1,
                "image": "01.png",
                "description": "Upright for room designs incl. floor profile in stainless steel appearance, depth: 250 - 900 mm, edging on both sides, Plinth height 70 mm: 2253 mm Plinth height 100 mm: 2283 mm Plinth height 150 mm: 2333 mm Plinth height 200 mm: 2383 mm",
                "price": 500
            },
            {
                "id": 1,
                "code": "HWR16-04",
                "position": 1,
                "quantity": 1,
                "image": "01.png",
                "description": "Upright for room designs incl. floor profile in stainless steel appearance, depth: 250 - 900 mm, edging on both sides, Plinth height 70 mm: 2253 mm Plinth height 100 mm: 2283 mm Plinth height 150 mm: 2333 mm Plinth height 200 mm: 2383 mm",
                "price": 500
            }];
        const getProducts1 = jest.fn((0, logic_1.getProducts)({
            product: {
                findMany: (c) => __awaiter(void 0, void 0, void 0, function* () {
                    expect(c.orderBy).not.toBeUndefined();
                    expect(c.skip).toEqual(0);
                    expect(c.take).toEqual(5);
                    return expectedResult;
                }),
            }
        }));
        const router = (0, express_1.Router)();
        router.get("/products", getProducts1);
        const app1 = (0, express_1.default)();
        app1.use('/', router);
        return (0, supertest_1.default)(app1)
            .get(`/products?order=-id&max_results=5&offset=0`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
            expect(res.body[0].id).toBeGreaterThan(res.body[1].id);
        });
    }));
    it('should return 200 & valid filtered response', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResult = [{
                "id": 2,
                "code": "HWR16-04",
                "position": 1,
                "quantity": 1,
                "image": "01.png",
                "description": "Upright for room designs incl. floor profile in stainless steel appearance, depth: 250 - 900 mm, edging on both sides, Plinth height 70 mm: 2253 mm Plinth height 100 mm: 2283 mm Plinth height 150 mm: 2333 mm Plinth height 200 mm: 2383 mm",
                "price": 500
            },
            {
                "id": 1,
                "code": "HWR16-04",
                "position": 1,
                "quantity": 1,
                "image": "01.png",
                "description": "Upright for room designs incl. floor profile in stainless steel appearance, depth: 250 - 900 mm, edging on both sides, Plinth height 70 mm: 2253 mm Plinth height 100 mm: 2283 mm Plinth height 150 mm: 2333 mm Plinth height 200 mm: 2383 mm",
                "price": 500
            }];
        const getProducts1 = jest.fn((0, logic_1.getProducts)({
            product: {
                findMany: (c) => __awaiter(void 0, void 0, void 0, function* () {
                    expect(c.where.AND[0].code.equals).toEqual('HWR16-04');
                    expect(c.where.AND[1].position.equals).toEqual(1);
                    return expectedResult;
                }),
            }
        }));
        const router = (0, express_1.Router)();
        router.get("/products", getProducts1);
        const app1 = (0, express_1.default)();
        app1.use(body_parser_1.default.json());
        app1.use(body_parser_1.default.urlencoded({ extended: true }));
        app1.use((0, cors_1.default)());
        app1.use('/', router);
        return (0, supertest_1.default)(app1)
            .get(`/products?q[code]=HWR16-04&q[position]=1`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
            expect(res.body[0].id).toBeGreaterThan(res.body[1].id);
        });
    }));
    it('should return 200 & a single product', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResult = {
            "id": 2,
            "code": "HWR16-04",
            "position": 1,
            "quantity": 1,
            "image": "01.png",
            "description": "Upright for room designs incl. floor profile in stainless steel appearance, depth: 250 - 900 mm, edging on both sides, Plinth height 70 mm: 2253 mm Plinth height 100 mm: 2283 mm Plinth height 150 mm: 2333 mm Plinth height 200 mm: 2383 mm",
            "price": 500
        };
        const getProduct1 = jest.fn((0, logic_1.getProduct)({
            product: {
                findUnique: (c) => __awaiter(void 0, void 0, void 0, function* () {
                    expect(c.where.id).toEqual(2);
                    return expectedResult;
                }),
            }
        }));
        const router = (0, express_1.Router)();
        router.get("/products/:id", getProduct1);
        const app1 = (0, express_1.default)();
        app1.use('/', router);
        return (0, supertest_1.default)(app1)
            .get(`/products/2`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
            expect(res.body.id).toEqual(2);
        });
    }));
    it('should return 204 & and delete  product', () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteProduct1 = jest.fn((0, logic_1.deleteProduct)({
            product: {
                delete: (c) => __awaiter(void 0, void 0, void 0, function* () {
                    expect(c.where.id).toEqual(2);
                    return '';
                }),
            }
        }));
        const router = (0, express_1.Router)();
        router.delete("/products/:id", deleteProduct1);
        const app1 = (0, express_1.default)();
        app1.use(body_parser_1.default.json());
        app1.use(body_parser_1.default.urlencoded({ extended: true }));
        app1.use((0, cors_1.default)());
        app1.use('/', router);
        return (0, supertest_1.default)(app1)
            .delete(`/products/2`)
            .expect(204)
            .then(res => {
            expect(res.body).toEqual({});
        });
    }));
});
//# sourceMappingURL=products.test.js.map