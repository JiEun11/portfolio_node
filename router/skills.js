import express from "express";
import "express-async-errors";

let skills = [
  {
    id: "1",
    name: "React",
    categoryId: "1",
    createdAt: Date.now().toString(),
    lastUpdated: Date.now().toString(),
  },
  {
    id: "2",
    name: "Node",
    categoryId: "2",
    createdAt: Date.now().toString(),
    lastUpdated: Date.now().toString(),
  },
  {
    id: "3",
    name: "Python",
    categoryId: "3",
    createdAt: Date.now().toString(),
    lastUpdated: Date.now().toString(),
  },
];
const router = express.Router();

// GET /skills
// GET /skills?categoryId=:categoryId
router.get("/", (req, res, next) => {
  const categoryId = req.query.categoryId;
  const data = categoryId
    ? skills.filter((skill) => skill.categoryId === categoryId)
    : skills;
  res.status(200).json(data);
});
// GET /skills/:id

// POST /skills

// PUT /skills/:id

// DELETE /skills/:id
export default router;
