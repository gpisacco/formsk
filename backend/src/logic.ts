
import { RequestParser } from "./helpers/RequestParser";
import { PrismaClient } from '@prisma/client'
import { Request, Response } from "express";

export const getProducts = (prisma: PrismaClient) => async (req: Request, res: Response): Promise<Response> => {
    const rp = new RequestParser(req.query);
    return res.status(200).json(await prisma.product.findMany(rp.build()));
}

export const getProduct = (prisma: PrismaClient) => async (req: Request, res: Response): Promise<Response> => {
    const product = await prisma.product.findUnique({ where: { id: parseInt(req.params.id) } })
    return res.status(200).json(product);
}

export const createProduct = (prisma: PrismaClient) => async (req: Request, res: Response): Promise<Response> => {
    const product = await prisma.product.create({ data: req.body });
    return res.status(200).json(product);
}

export const deleteProduct = (prisma: PrismaClient) => async (req: Request, res: Response): Promise<Response> => {
    await prisma.product.delete({ where: { id: parseInt(req.params.id) } })
    return res.status(204).send('');
}