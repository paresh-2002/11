import express from "express";
import { userModel } from "../db/userModel.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();

const JWT_SECRET =
  "63c5c001cf0c18046c73d781732054daf0ffad4246aa0800434312384dd66c883fef46e90acb8d9426dc3b9a147149395bc8bcb3989d451a50a6fdf837717512";

  router.get("/users", async (req, res) => {
    const result = await userModel.find({});
    res.send(result);
  });
  router.get("/users:id", async (req, res) => {
    let query = { _id: new ObjectId(req.params.id) };
    let email = { email: req.body.email };
    const result = await userModel.findOne(email, query);
    res.send(result);
  });
  
  router.post("/signup", async (req, res) => {
      const { userName, email, password, role } = req.body;
      const encryptedPassword = await bcrypt.hash(password, 10);
      try {
        const oldUser = await userModel.findOne({ email });
        if (oldUser) {
          return res.json({ error: "User Exists" });
        }
        await userModel.create({
          userName,
          email,
          password: encryptedPassword,
          role,
        });
        res.send({ status: "ok" });
      } catch (error) {
        res.send({ status: "error" });
      }
    });
    
    router.post("/login", async (req, res) => {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ error: "User Not found" });
      }
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
          expiresIn: "15m",
        });
        if (res.status(201)) {
          return res.json({ status: "ok", data: token });
        } else {
          return res.json({ error: "error" });
        }
      }
      res.json({ status: "error", error: "InvAlid Password" });
    });
  

export default router;
