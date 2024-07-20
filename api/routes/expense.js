import express from "express";
import { createExpense, updateExpense, deleteExpense, getExpenses, getExpense } from "../controllers/expense.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create",protectRoute, createExpense);

router.put("/:id",protectRoute, updateExpense);

router.delete("/:id",protectRoute, deleteExpense);

router.get("/:id",protectRoute, getExpense);

router.get("/",protectRoute, getExpenses);

export default router;