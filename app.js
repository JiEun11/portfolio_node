import express from "express";
import fs from "fs";
import fsAsync from "fs/promises";
import "express-async-errors";

const app = express();

app.use(express.json());

app
  .route("/posts")
  .get((req, res, next) => {
    res.status(201).send("GET: /posts");
  })
  .post((req, res) => {
    res.status(201).send("POST: /posts");
  });

app.get("/posts", (req, res) => {
  res.status(201).send("GET: /posts");
});

app.post("/posts", (req, res) => {
  res.status(201).send("POST: /posts");
});

app.put("/posts/:id", () => {
  res.status(201).send("PUT: /posts/:id");
});

app.delete("/posts/:id", () => {
  res.status(201).send("DELETE: /posts/:id");
});

app.use((error) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(8080);
