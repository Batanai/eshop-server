import express from "express";

import {
  createUser,
  getUserById,
  getUsers,
  login,
} from "../controllers/userController.js";

const router = express.Router();

//create user
router.post("/register", createUser);

// get users
router.get("/", getUsers);

// get user by id
router.get("/:id", getUserById);

// login
router.post("/login", login);

export default router;
