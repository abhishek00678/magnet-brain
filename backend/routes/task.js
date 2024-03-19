import express from "express";
import { isAuth } from "../middelware/auth.js";
import {
  getMyTask,
  newTask,
  updateTask,
  deleteTask,
  markAsDone,
} from "../controllers/task.js";

const router = express.Router();

router.post("/new", isAuth, newTask);
router.get("/mytask", isAuth, getMyTask);
router.put("/update/:id", isAuth, updateTask);
router.put("/md/:id", isAuth, markAsDone);
router.delete("/:id", isAuth, deleteTask);

export default router;
