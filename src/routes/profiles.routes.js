import { Router } from 'express';
import { createProfile, getProfiles, getProfileById, updateProfile, deleteProfile } from '../controllers/profiles.controllers.js';
import { createProfileValidation, getProfileByPkValidations, updateProfileValidation, deleteProfileValidation } from "../middlewares/validations/profiles.validations.js";
import { validator } from "../middlewares/validator.js";

const router = Router();

router.post('/', createProfileValidation, validator, createProfile);
router.get('/', getProfiles);
router.get("/:id", getProfileByPkValidations, validator, getProfileById);
router.put("/:id", updateProfileValidation, validator, updateProfile);
router.delete("/:id", deleteProfileValidation, validator, deleteProfile);

export default router;