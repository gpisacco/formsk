import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { getProducts, getProduct, createProduct, deleteProduct } from "./logic";

export let prisma1 = new PrismaClient({  log: ['query'],
})

const router = Router();

router.get("/products", getProducts(prisma1) );

router.get("/products/:id", getProduct(prisma1));

router.put("/products", createProduct(prisma1));

router.delete("/products/:id", deleteProduct(prisma1) );

export default router;
