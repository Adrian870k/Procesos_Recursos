import { Schema, model } from "mongoose";

const MascotaSchema = new Schema({
  name: { type: String, trim: true },
  raza: { type: String, trim: true },
  age: { type: Number, trim: true },
  propietario: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const mascota: any = model("Mascota", MascotaSchema);
export { mascota };
