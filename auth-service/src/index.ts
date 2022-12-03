import {
  DatabaseConnectionError,
  BadRequestError,
  errorHandler,
} from "@angelgoezg/common";
import express, { Response, Request } from "express";
import { MongooseConnection } from "./db/mongoose";
import { User } from "./models/user";
import "express-async-errors";
import { api } from "./routes/Product-route";
import { apiMascota } from "./routes/Mascota-route";

const app = express();
const port = 8881;

app.use(express.json());
app.use(api);
app.use(apiMascota);

app.post("/api/signup", async (reg: Request, res: Response) => {
  console.log(reg.body);
  try {
    const user = new User(reg.body);
    await user.save();
    res.status(201).send({ user });
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
});

app.post("/api/signin", async (reg: Request, res: Response) => {
  const { email, pwd } = reg.body;
  try {
    const user = await User.findUserByCredentials(email, pwd);
    const token = await user.generateAuthToken();
    res.send({ token });
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
});

app.post("/api/signup/:document", (req: Request, res: Response) => {
  const document = req.params.document;
  if (Number(document) > 2) {
    return res.send({ message: "El id del usuario no existe" });
  }
  const database: any = {
    "1": "Yordan",
    "2": "DianaMaria",
  };
  //res.send(`<h1>${document}</h1>`)
  res.send({
    personaEstudiante: database[document],
    edadEstudiante: 56,
    trabajo: "Desempleado",
    ubicacion: "Medellin - Antioquia",
  });
  //res.send(`<h1>${database[document]}</h1>`)
});

app.all("*", (reg: Request, res: Response) => {
  res.status(404).send({ message: "Not found" });
});
app.use(errorHandler);

app.listen(8080, async () => {
  try {
    const connection = await MongooseConnection.connect();
    console.log(connection);
    console.log("Auth-service is up and running in port 8080");
  } catch (error) {
    throw new DatabaseConnectionError();
  }
});
