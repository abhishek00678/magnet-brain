import express from "express";
import {
  login,
  register,
  getAllUserDetails,
  getAllUsers,
  logout,
} from "../controllers/user.js";
import { isAuth } from "../middelware/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.post("/new", register);
router.post("/login", login);
router.get("/logout", isAuth, logout);
router.get("/profile", isAuth, getAllUserDetails);

export default router;

// router.route("/userid/:id").get(getAllUserDetails);
