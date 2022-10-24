import { Server } from "../../server";
import fs from "fs";

export default function fileHandler(server, options, next) {
  server.post(
    "/addSingle",
    { preHandler: Server.upload.single("avatar") },
    async (req, res) => {
      const { directory } = req.body;
      console.log(directory);
      const { Files } = server.db.models;
      console.log(Files);
      const image = new Files({
        filename: req.file.filename,
        originalname: req.file.originalname,
        url: req.file.path,
      });
      const data = await image.save();
      res.code(201).send(data);
    }
  );

  server.post(
    "/addMultiple",
    { preHandler: Server.upload.array("avatar") },
    (req, res) => {
      res.code(200).send("SUCCESS");
    }
  );

  server.post("/createDirectory", (req, res) => {
    const { directory } = req.body;
    if (!fs.existsSync(Server.UPLOAD_DIRECTORY + directory)) {
      fs.mkdirSync(Server.UPLOAD_DIRECTORY + directory, {
        recursive: true,
      });
      res.code(201).send("Directory created");
    }
    res.code(500).send("Directory already exists");
  });

  server.delete("/deleteDirectory/:directory", (req, res) => {
    const { directory } = req.params;
    if (fs.existsSync(Server.UPLOAD_DIRECTORY + directory)) {
      fs.rmdirSync(Server.UPLOAD_DIRECTORY + directory, { recursive: true });
      res.code(200).send("Directory deleted");
    }
    res.code(500).send("Directory not exists");
  });

  server.delete("/renameDirectory/:", (req, res) => {
    const { oldDir, newDir } = req.params;
    if (fs.existsSync(Server.UPLOAD_DIRECTORY + oldDir)) {
      fs.rename(
        Server.UPLOAD_DIRECTORY + oldDir,
        Server.UPLOAD_DIRECTORY + newDir,
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
      res.code(200).send("SUCCESS");
    }
  });

  next();
}
