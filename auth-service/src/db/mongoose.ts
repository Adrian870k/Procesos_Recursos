import mongoose from "mongoose";

export class MongooseConnection {
  static connect() {
    const mongoUrI: string =
      process.env.MONGO_URI || "mongodb://yod:123@localhost:9032/DBPoli";
    return new Promise((resolve, reject) => {
      mongoose.connection.openUri(mongoUrI, (err, res) => {
        if (err) reject(err);
        resolve("Database connected");
      });
    });
  }
}
