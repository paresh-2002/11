import express from "express";
import { ObjectId } from "mongodb";
import { StudentModel } from "../db/studentModel.js";
const router = express.Router();
router.get("/", async (req, res) => {
  const result = await StudentModel.find({});
  res.send(result);
});
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  const firstArticle = await StudentModel.findOne(query);
  res.send(firstArticle);
});
router.post("/", async (req, res) => {
  try {
    let newEmployee = {
      name: req.body.name,
      city: req.body.city,
      category: req.body.category,
    };
    let result = await StudentModel.create(newEmployee);
    res.send(result).status(204);
  } catch (e) {
    console.log("post", e);
  }
});
router.patch("/:id", async (req, res) => {
  try {
    let query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        city: req.body.city,
        category: req.body.category,
      },
    };
    let result = await StudentModel.findByIdAndUpdate(query, updates);
    res.send(result).status(204);
  } catch (error) {
    console.log("update", error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    let query = { _id: new ObjectId(req.params.id) };
    let result = await StudentModel.deleteOne(query);
    res.send(result).status(202);
  } catch (error) {
    console.log("delete", error);
  }
});

export default router;


