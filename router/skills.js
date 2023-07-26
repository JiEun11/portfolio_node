import express from "express";
import "express-async-errors";
import { db } from "../db/database.js";

const SELECT_JOIN =
  "SELECT sk.id, sk.name, sk.categoryId, sk.createdAt, sk.lastUpdatedAt FROM skills as sk";
const ORDER_DESC = "ORDER BY sk.createdAt DESC";

const router = express.Router();

// GET /skills
// GET /skills?categoryId=:categoryId
router.get("/", async (req, res, next) => {
  const categoryId = req.query.categoryId;
  if (categoryId) {
    const result = await db.execute(
      `${SELECT_JOIN} WHERE categoryId=? ${ORDER_DESC}`,
      [categoryId]
    );
    if (result) {
      const skills = result[0];
      skills.length === 0
        ? res
            .status(404)
            .json({ message: `Category id(${id}) is not found !!!` })
        : res.status(200).json(result[0]);
    }
  } else {
    const result = await db.execute(`${SELECT_JOIN} ${ORDER_DESC}`);
    res.status(200).json(result[0]);
  }
});
// GET /skills/:id
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  // return db.execute(`${SELECT_JOIN} WHERE sk.id=?`, [id]).then((result) => {
  //   const skill = result[0][0];
  //   skill
  //     ? res.status(200).json(result[0][0])
  //     : res.status(404).json({ message: `Skill id(${id}) is not found !!!` });
  // });

  const result = await db.execute(`${SELECT_JOIN} WHERE sk.id=?`, [id]);
  const skill = result[0][0];
  skill
    ? res.status(200).json(result[0][0])
    : res.status(404).json({ message: `Skill id(${id}) is not found !!!` });
});

// POST /skills
router.post("/", async (req, res, next) => {
  const { categoryId, name } = req.body;
  const result = await db.execute(
    "INSERT INTO skills (name, categoryId, createdAt, lastUpdatedAt) VALUES(?,?,?,?)",
    [name, categoryId, new Date(), new Date()]
  );
  res.status(201).json(result);
});

// PUT /skills/:id
router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const result = await db.execute(
    "UPDATE skills SET name=?, lastUpdatedAt=? WHERE id=?",
    [name, new Date(), id]
  );

  result[0].changedRows === 1
    ? res.status(200).json(result)
    : res.status(404).json({ message: `Skill id(${id}) is not found!!!` });
});

// DELETE /skills/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  const result = db.execute("DELETE FROM skills WHERE id=?", [id]);
  res.sendStatus(204);
});
export default router;
