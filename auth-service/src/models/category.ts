import {Schema, model, Types } from "mongoose";
const CategorySchema = new Schema({
    name: { type: String, trim: true },
    disponible: {type: Boolean, default: true}
});
const category: any = model("Category", CategorySchema);
export {category};