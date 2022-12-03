import { Router } from "express";
import { auth } from "../middlewares/auth";
import express, { Response, Request } from "express";
import { mascota } from "../models/mascota";
import { BadRequestError } from "@angelgoezg/common";

const apiMascota = Router();

apiMascota.post("/api/enviarMascota", auth, async (req: Request, res: Response) => {
  try {
    const masc = new mascota({ ...req.body, propietario: req.user?._id });
    await masc.save();
    res.status(201).send({ masc });
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
});

apiMascota.get("/api/mascotas", auth, async (req: Request, res: Response) => {
  try {
    const masc = await mascota
      .find()
      .populate("propietario", "name username email");
    res.send({ masc });
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
});

export { apiMascota };
