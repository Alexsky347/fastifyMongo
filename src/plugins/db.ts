import mongoose, { ConnectOptions } from "mongoose";
import EnvService from "../utils/EnvService";

export default class DB {
  public static init() {
    return mongoose.connect(
      `mongodb://${EnvService.getEnv(
        "MONGO_HOST",
        "localhost"
      )}:${EnvService.getEnv("MONGO_PORT", 27017)}/${EnvService.getEnv(
        "MONGO_DATABASE",
        "fastify"
      )}`,
      { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions,
      (err) => {
        if (!err) {
          console.log("MongoDB connection successful.");
        } else {
          console.log(
            "Error in DB connection : " + JSON.stringify(err, undefined, 2)
          );
        }
      }
    );
  }
}
