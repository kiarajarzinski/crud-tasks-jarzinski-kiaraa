import { body, param } from "express-validator";
import ProjectModel from "../../models/projects.models.js";

// Validar ID de proyecto
export const getProjectByPkValidations = [
  param('id')
    .isInt().withMessage('El id debe ser un entero')
    .custom(async (value) => {
      const project = await ProjectModel.findByPk(value);
      if (!project) throw new Error('No existe un proyecto con ese id');
    }),
];

// Crear proyecto
export const createProjectValidation = [
  body("name")
    .notEmpty().withMessage("El nombre es obligatorio")
    .isString().withMessage("El nombre debe ser texto")
    .custom(async (value) => {
      const project = await ProjectModel.findOne({ where: { name: value } });
      if (project) throw new Error("Ya existe un proyecto con ese nombre");
      return true;
    }),
  body("description").optional().isString().withMessage("La descripción debe ser texto"),
  body("userIds").optional().isArray().withMessage("userIds debe ser un array"),
];

// Actualizar proyecto
export const updateProjectValidation = [
  param("id")
    .isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const project = await ProjectModel.findByPk(id);
      if (!project) throw new Error("Proyecto no encontrado");
      return true;
    }),
  body("name").optional().isString().withMessage("El nombre debe ser texto"),
  body("description").optional().isString().withMessage("La descripción debe ser texto"),
  body("userIds").optional().isArray().withMessage("userIds debe ser un array"),
];

// Eliminar proyecto
export const deleteProjectValidation = [
  param("id")
    .isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const project = await ProjectModel.findByPk(id);
      if (!project) throw new Error("Proyecto no encontrado");
      return true;
    }),
];