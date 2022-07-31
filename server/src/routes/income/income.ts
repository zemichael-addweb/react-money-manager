import express, { Router, Request, Response } from "express";
import { IncomeController } from "src/controllers/IncomeController";
import { Service } from "src/services";

const service: Service = new Service;
const controller: IncomeController = new IncomeController(service);
const registerIncome = controller.registerIncome;
const getAllIncome = controller.getAllIncome;
const deleteIncome = controller.deleteIncome;
const editIncome = controller.editIncome;

const router: Router = express.Router();

// POST /income/
router.get('/', getAllIncome);

// POST /income/register
router.post('/', registerIncome);

// POST /income/delete
router.delete('/', deleteIncome);

// POST /income/delete
router.patch('/', editIncome);

export default router;