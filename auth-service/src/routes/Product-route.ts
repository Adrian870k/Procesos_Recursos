import { Router } from "express";
import express, { Response, Request } from "express";
import { products } from "../models/products";
import { BadRequestError } from "@angelgoezg/common";
import { auth } from "../middlewares/auth";

const api = Router();

api.post("/api/enviar", auth, async (req: Request, res: Response) => {
  try {
    const product = new products({ ...req.body, createBy: req.user?._id });
    await product.save();
    res.status(201).send({ product });
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
});

api.get("/api/products", auth, async (req: Request, res: Response) => {
  try {
    const productos = await products
      .find()
      .populate('createBy', 'name username email');
    res.send({ productos });
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
});
export { api };
