import { Router } from "express";
import {
  getUsers,        
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/users.controllers.js";
import { createUserValidation, getUserByPkValidations, updateUserValidation, deleteUserValidation } from "../middlewares/validations/users.validations.js";
import { validator } from "../middlewares/validator.js";


const router = Router();

router.post("/", createUserValidation, validator, createUser);
router.get("/", getUsers);
router.get("/:id", getUserByPkValidations, validator, getUserById);
router.put("/:id", updateUserValidation, validator, updateUser);
router.delete("/:id", deleteUserValidation, validator, deleteUser);


export default router;