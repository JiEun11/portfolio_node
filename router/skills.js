import express from "express";
import "express-async-errors";

const router = express.Router();

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

export default router;
