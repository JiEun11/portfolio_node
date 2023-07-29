import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import skillRouter from "./router/skills.js";
import { db } from "./db/database.js";
import * as path from "path";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use(helmet());
// app.use(cors());
// app.use(morgan("tiny"));

app.use(express.urlencoded({ extended: true })); // application-
app.use("/skills", skillRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

db.getConnection().then((connection) => console.log(connection));
app.listen(8080);
