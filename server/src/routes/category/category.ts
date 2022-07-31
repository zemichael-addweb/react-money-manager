import express, { Router, Request, Response } from "express";
import { CategoryController } from "../../controllers/CategoryController";
import { Service } from "../../services";

const service: Service = new Service;
const controller: CategoryController = new CategoryController(service);
const createCategory = controller.createCategory;
const deleteCategory = controller.deleteCategory;
const getAllCategory = controller.getAllCategory;
const editCategory = controller.editCategory;


const router: Router = express.Router();

// POST /category/
router.post('/', createCategory);

// DELETE /category/
router.delete('/', deleteCategory);

// EDIT /category/
router.patch('/', editCategory);

// GET /category/
router.get('/', getAllCategory);
export default router;