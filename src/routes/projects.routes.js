import { Router } from 'express';
import { createProject, getProjects, getProjectbyId, updateProject, deleteProject } from '../controllers/projects.controllers.js';

const router = Router();

router.post('/', createProject);
router.get('/', getProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
export default router;