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
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const skill = skills.find((skill) => skill.id === id);
  if (skill) {
    res.status(200).json(skill);
  } else {
    res.status(404).json({ message: `Skill id(${id}) is not found !!!` });
  }
});

// POST /skills
router.post("/", (req, res, next) => {
  const { categoryId, name } = req.body;
  const skill = {
    id: Date.now().toString(),
    name,
    categoryId,
    createdAt: Date.now().toString(),
    lastUpdated: Date.now().toString(),
  };
  skills = [skill, ...skills]; // 최근에 추가한 skill이 가장 앞에 오도록
  res.status(201).json(skill);
});

// PUT /skills/:id
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const skill = skills.find((skill) => skill.id === id);
  if (skill) {
    skill.name = name;
    res.status(200).json(skill);
  } else {
    res.status(404).json({ message: `Skill id(${id}) is not found!!!` });
  }
});

// DELETE /skills/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  skills = skills.filter((skill) => skill.id !== id);
  res.sendStatus(204);
});
export default router;
