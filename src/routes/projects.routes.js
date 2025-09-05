import { Router } from 'express';
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from '../controllers/projects.controllers.js';
import { createProjectValidation, getProjectByPkValidations, updateProjectValidation, deleteProjectValidation } from "../middlewares/validations/projects.validations.js";
import { validator } from "../middlewares/validator.js";

const router = Router();

router.post('/', createProjectValidation, validator, createProject);
router.get('/', getProjects);
router.get('/:id', getProjectByPkValidations, validator, getProjectById);
router.put('/:id', updateProjectValidation, validator, updateProject);
router.delete('/:id', deleteProjectValidation, validator, deleteProject);
export default router;