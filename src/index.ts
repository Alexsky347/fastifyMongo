import { Address } from "cluster";
import { Server } from "./server";
import EnvService from "./utils/EnvService";

const server = Server.createServer();

server.listen(
  {
    port: EnvService.getEnv("PORT", 3001),
    host: EnvService.getEnv("HOST", "localhost"),
  },
  (err: Error, address: Address) => {
    if (err) throw err;
    console.log(`server listening on ${address}`);
  }
);

module.exports = server;
