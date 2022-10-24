import fastify, { FastifyError, FastifyRequest } from "fastify";

import healthHandler from "./modules/health/routes";
import productsHandler from "./modules/products/routes";
import cors from "@fastify/cors";
import { fastifyStatic } from "@fastify/static";
import fastifyMulter from "fastify-multer";
import path from "path";
import DB from "./plugins/db";
import EnvService from "./utils/EnvService";
import { File } from "fastify-multer/lib/interfaces";
import fileHandler from "./modules/file/routes";
import { FastifyReply } from "fastify";

export class Server {
  private static server;

  public static readonly UPLOAD_DIRECTORY = EnvService.getEnv(
    "UPLOAD_DIRECTORY",
    "uploads/"
  );

  public static upload = fastifyMulter({
    dest: this.UPLOAD_DIRECTORY,
    fileFilter: this.customFileFilter,
  });

  private static apiPrefix: string = EnvService.getEnv("API_PREFIX", "api");

  /**
   *
   * @returns server
   */
  public static createServer() {
    DB.init();

    this.server = fastify();

    //cors
    this.server.register(cors);

    //static
    this.server.register(fastifyStatic, {
      root: path.join(__dirname, "public"),
      prefix: "/public/", // optional: default '/'
    });

    // register fastify content parser
    this.server.register(fastifyMulter.contentParser);

    //this.initStorage();
    this.declareEndPoints();
    this.handleError();

    return this.server;
  }

  /**
   *
   */
  private static declareEndPoints() {
    this.server.register(healthHandler, { prefix: `${this.apiPrefix}/health` });
    this.server.register(productsHandler, {
      prefix: `${this.apiPrefix}/product`,
    });
    this.server.register(fileHandler, {
      prefix: `${this.apiPrefix}/file`,
    });
  }

  /**
   *
   */
  private static handleError() {
    this.server.setErrorHandler(
      (error: FastifyError, req: FastifyRequest, res: FastifyReply) => {
        const statusCode = error?.statusCode || 500;
        req.log.error(error.toString());
        res.code(statusCode).send({ error });
      }
    );
  }

  private static customFileFilter(req: FastifyRequest, file: File, cb: any) {
    const fileRegex =
      /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG|webp|WEBP|pdf)$/;
    if (!file.originalname.match(fileRegex)) {
      // req.fileValidationError = "Only image files & pdf are allowed!";
      return cb(new Error("Only image files & pdf are allowed!"), false);
    }
    cb(null, true);
  }
}
