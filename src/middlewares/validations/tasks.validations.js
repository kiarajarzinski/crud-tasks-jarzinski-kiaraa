import { body, param } from "express-validator";
import TaskModel from "../../models/tasks.models.js";
import UserModel from "../../models/users.models.js";

// Validar ID de tarea
export const getTaskByPkValidations = [
  param('id')
    .isInt().withMessage('El id debe ser un entero')
    .custom(async (value) => {
      const task = await TaskModel.findByPk(value);
      if (!task) throw new Error('No existe una tarea con ese id');
    }),
];

// Crear tarea
export const createTaskValidation = [
  body("title")
    .notEmpty().withMessage("El título es obligatorio")
    .isString().withMessage("El título debe ser texto")
    .custom(async (value) => {
      const task = await TaskModel.findOne({ where: { title: value } });
      if (task) throw new Error("Ya existe una tarea con ese título");
      return true;
    }),
  body("description")
    .notEmpty().withMessage("La descripción es obligatoria")
    .isString().withMessage("La descripción debe ser texto"),
  body("isComplete")
    .isBoolean().withMessage("isComplete debe ser booleano"),
  body("userId")
    .isInt().withMessage("userId debe ser un entero")
    .custom(async (value) => {
      const user = await UserModel.findByPk(value);
      if (!user) throw new Error("Usuario no encontrado");
      return true;
    }),
];

// Actualizar tarea
export const updateTaskValidation = [
  param("id")
    .isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const task = await TaskModel.findByPk(id);
      if (!task) throw new Error("Tarea no encontrada");
      return true;
    }),
  body("title").optional().isString().withMessage("El título debe ser texto"),
  body("description").optional().isString().withMessage("La descripción debe ser texto"),
  body("isComplete").optional().isBoolean().withMessage("isComplete debe ser booleano"),
];

// Eliminar tarea
export const deleteTaskValidation = [
  param("id")
    .isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const task = await TaskModel.findByPk(id);
      if (!task) throw new Error("Tarea no encontrada");
      return true;
    }),
];