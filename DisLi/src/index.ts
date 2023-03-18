import { AppDataSource } from "./utils/data-source";
import "reflect-metadata";
import express from "express";
import routes from "./routes";
import { clearDB } from "./utils/clearDB";

const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.get("/", (_, res) => {
  res.send("SUP");
});

app.get("/dev/wipe-database", async (_, res) => {
  clearDB();
  res.send("deleted");
});

AppDataSource.initialize();

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
