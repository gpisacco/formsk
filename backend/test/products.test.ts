import request from 'supertest'
import { Express } from 'express-serve-static-core'
import app from '../src/app';
import express, { Router } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { createProduct, deleteProduct, getProduct, getProducts } from '../src/logic';
import bodyParser from "body-parser";
import cors from 'cors'
let server: Express

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
        const getProducts1 = jest.fn(getProducts({
            product: {
                findMany: async (c: any) => {
                    return expectedResult;
                },
            }
        } as unknown as PrismaClient))

        const router = Router();
        router.get("/products", getProducts1);
        const app1 = express()
        app1.use('/', router)

        return request(app1)
            .get(`/products?code=HWR16-03`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toMatchObject(expectedResult);
            })
    })

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

        const getProducts1 = jest.fn(getProducts({
            product: {
                findMany: async (c: any) => {
                    return expectedResult;
                },
            }
        } as unknown as PrismaClient))

        const router = Router();
        router.get("/products", getProducts1);
        const app1 = express()
        app1.use('/', router)

        return request(app1)
            .get(`/products`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body.length).toEqual(1);
            })
    })

    it('should return 200 & valid response with a new value', async () => {
        const value = {
            "code": "HWR16-04",
            "position": 1,
            "quantity": 1,
            "image": "01.png",
            "description": "Upright for room designs incl. floor profile in stainless steel appearance, depth: 250 - 900 mm, edging on both sides, Plinth height 70 mm: 2253 mm Plinth height 100 mm: 2283 mm Plinth height 150 mm: 2333 mm Plinth height 200 mm: 2383 mm",
            "price": 500
        } as Prisma.productUncheckedCreateInput;

        const createProduct1 = jest.fn(createProduct({
            product: {
                create: async (c: any) => {
                    value.id = 17;
                    return value;
                },
            }
        } as unknown as PrismaClient))

        const router = Router();
        router.put("/products", createProduct1);
        const app1 = express()
        app1.use(bodyParser.json());
        app1.use(bodyParser.urlencoded({ extended: true }));
        app1.use(cors())
        app1.use('/', router)

        return request(app1)
            .put(`/products`)
            .send(value)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body.id).toEqual(17);
            })
    })

    it('should return 200 & valid projected response', async () => {
        const expectedResult = [{
            "id": 1,
            "code": "HWR16-04"
        }];

        const getProducts1 = jest.fn(getProducts({
            product: {
                findMany: async (c: any) => {
                    expect(c.select).not.toBeUndefined()
                    expect(c.select.code).toBeTruthy()
                    expect(c.select.id).toBeTruthy()
                    return expectedResult;
                },
            }
        } as unknown as PrismaClient))

        const router = Router();
        router.get("/products", getProducts1);
        const app1 = express()
        app1.use('/', router)

        return request(app1)
            .get(`/products?projection=code,id`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body[0].position).toBeUndefined();
            })
    })

    it('should return 200 & valid sorted response', async () => {
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

        const getProducts1 = jest.fn(getProducts({
            product: {
                findMany: async (c: any) => {
                    expect(c.orderBy).not.toBeUndefined()
                    expect(c.skip).toEqual(0)
                    expect(c.take).toEqual(5)
                    return expectedResult;
                },
            }
        } as unknown as PrismaClient))

        const router = Router();
        router.get("/products", getProducts1);
        const app1 = express()
        app1.use('/', router)

        return request(app1)
            .get(`/products?order=-id&max_results=5&offset=0`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body[0].id).toBeGreaterThan(res.body[1].id);
            })
    })

    it('should return 200 & valid filtered response', async () => {
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

        const getProducts1 = jest.fn(getProducts({
            product: {
                findMany: async (c: any) => {
                    expect(c.where.AND[0].code.equals).toEqual('HWR16-04')
                    expect(c.where.AND[1].position.equals).toEqual(1);
                    return expectedResult;
                },
            }
        } as unknown as PrismaClient))

        const router = Router();
        router.get("/products", getProducts1);
        const app1 = express()
        app1.use(bodyParser.json());
        app1.use(bodyParser.urlencoded({ extended: true }));
        app1.use(cors())
        app1.use('/', router)

        return request(app1)
            .get(`/products?q[code]=HWR16-04&q[position]=1`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body[0].id).toBeGreaterThan(res.body[1].id);
            })
    })

    it('should return 200 & a single product', async () => {
        const expectedResult = {
            "id": 2,
            "code": "HWR16-04",
            "position": 1,
            "quantity": 1,
            "image": "01.png",
            "description": "Upright for room designs incl. floor profile in stainless steel appearance, depth: 250 - 900 mm, edging on both sides, Plinth height 70 mm: 2253 mm Plinth height 100 mm: 2283 mm Plinth height 150 mm: 2333 mm Plinth height 200 mm: 2383 mm",
            "price": 500
        };

        const getProduct1 = jest.fn(getProduct({
            product: {
                findUnique: async (c: any) => {
                    expect(c.where.id).toEqual(2)
                    return expectedResult;
                },
            }
        } as unknown as PrismaClient))

        const router = Router();
        router.get("/products/:id", getProduct1);
        const app1 = express()
        app1.use('/', router)

        return request(app1)
            .get(`/products/2`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body.id).toEqual(2);
            })
    })

    it('should return 204 & and delete  product', async () => {
        const deleteProduct1 = jest.fn(deleteProduct({
            product: {
                delete: async (c: any) => {
                    expect(c.where.id).toEqual(2)
                    return '';
                },
            }
        } as unknown as PrismaClient))

        const router = Router();
        router.delete("/products/:id", deleteProduct1);
        const app1 = express()
        app1.use(bodyParser.json());
        app1.use(bodyParser.urlencoded({ extended: true }));
        app1.use(cors())
        app1.use('/', router)

        return request(app1)
            .delete(`/products/2`)
            .expect(204)
            .then(res => {
                expect(res.body).toEqual({});
            })
    })

})