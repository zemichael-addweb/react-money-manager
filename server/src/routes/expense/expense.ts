import express, { Router, Request, Response } from "express";
import { ExpenseController } from "src/controllers/ExpenseController";
import { Service } from "src/services";

const service: Service = new Service;
const controller: ExpenseController = new ExpenseController(service);
const registerExpense = controller.registerExpense;
const getAllExpense = controller.getAllExpense;
const deleteIncome = controller.deleteExpense;

const router: Router = express.Router();

// POST /expense/register
router.post('/register', registerExpense);

// GET /expense
router.get('/', getAllExpense);

// DELETE /expense/register
router.delete('/delete', deleteIncome);

export default router;