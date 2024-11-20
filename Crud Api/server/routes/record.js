import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("employeeRecords");
  let results = await collection.find({}).toArray();
  res.send(results);
});
router.get("/:id", async (req, res) => {
  let collection = await db.collection("employeeRecords");
  let query = { _id: new ObjectId(req.params.id) };
  let results = await collection.findOne(query);

  if (!results) {
    res.send(404);
  } else {
    res.send(results).status(200);
  }
});
router.post("/", async (req, res) => {
  try {
    let newEmployee = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    let collection = await db.collection("employeeRecords");
    let result = await collection.insertOne(newEmployee);
    res.send(result).status(204);
  } catch (e) {
    console.log("post", e);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };
    let collection = await db.collection("employeeRecords");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(202);
  } catch (error) {
    console.log("patch", error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let query = { _id: new ObjectId(req.params.id) };
    let collection = await db.collection("employeeRecords");
    let result = await collection.deleteOne(query);
    res.send(result).status(202);
  } catch (error) {
    console.log("delete", error);
  }
});

export default router;
