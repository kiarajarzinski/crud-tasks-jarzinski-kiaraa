import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controllers.js";
import { createTaskValidation, getTaskByPkValidations, updateTaskValidation, deleteTaskValidation } from "../middlewares/validations/tasks.validations.js";
import { validator } from "../middlewares/validator.js";

const router = Router();

router.get("/", getTasks); 
router.post("/", createTaskValidation, validator, createTask);
router.get("/:id", getTaskByPkValidations, validator, getTaskById);
router.put("/:id", updateTaskValidation, validator, updateTask);
router.delete("/:id", deleteTaskValidation, validator, deleteTask);


export default router;