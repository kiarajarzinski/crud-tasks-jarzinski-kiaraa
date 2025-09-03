import { Router } from 'express';
import { createProfile, getProfiles } from '../controllers/profiles.controllers.js';

const router = Router();

router.post('/', createProfile);
router.get('/', getProfiles);

export default router;