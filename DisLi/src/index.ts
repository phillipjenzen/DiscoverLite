import { AppDataSource } from "./utils/data-source";
import "reflect-metadata";

import create_server from "./utils/server";

const port = 4000;

const app = create_server();

app.get("/", (_, res) => {
  res.send("SUP");
});

AppDataSource.initialize();

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
