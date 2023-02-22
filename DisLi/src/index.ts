import { AppDataSource } from "./utils/data-source";
import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import Checkout from "./routes/checkout";
import Help from "./routes/help";
import Item from "./routes/item";

const port = 4000;

(async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.get("/", (_, res) => {
    res.send("SUP");
  });

  app.get("/help", (_, res) => {
    res.send("Look elsewhere!");
  });

  app.use("/checkout", Checkout);
  app.use("/help", Help);
  app.use("/item", Item);

  AppDataSource.initialize();

  app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
  });
})();
