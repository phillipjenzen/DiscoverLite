import express from "express";
import routes from "../routes";

function create_server() {
  const app = express();

  app.use(express.json());

  routes(app);

  return app;
}

export default create_server;
