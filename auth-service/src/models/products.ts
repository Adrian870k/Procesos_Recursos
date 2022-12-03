import { Schema, model, Types } from "mongoose";
const ProductSchema = new Schema({
  name: { type: String, trim: true },
  price: { type: Number, trim: true, default: 0, required: true },
  createBy: { type: Schema.Types.ObjectId, ref: "User" },
  // category: { type: Schema.Types.ObjectId, ref: "Category" },
  isActive: { type: Boolean, default: true }
});

const products: any = model("Products", ProductSchema);
export { products };
