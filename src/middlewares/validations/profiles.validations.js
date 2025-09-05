import { body, param } from "express-validator";
import ProfileModel from "../../models/profiles.models.js";
import UserModel from "../../models/users.models.js";

// Validar ID de perfil
export const getProfileByPkValidations = [
  param('id')
    .isInt().withMessage('El id debe ser un entero')
    .custom(async (value) => {
      const profile = await ProfileModel.findByPk(value);
      if (!profile) throw new Error('No existe un perfil con ese id');
    }),
];

// Crear perfil
export const createProfileValidation = [
  body("bio").optional().isString().withMessage("La bio debe ser texto"),
  body("avatar").optional().isString().withMessage("El avatar debe ser texto"),
  body("userId")
    .isInt().withMessage("userId debe ser un entero")
    .custom(async (value) => {
      const user = await UserModel.findByPk(value);
      if (!user) throw new Error("Usuario no encontrado");
      const existingProfile = await ProfileModel.findOne({ where: { userId: value } });
      if (existingProfile) throw new Error("El usuario ya tiene un perfil");
      return true;
    }),
];

// Actualizar perfil
export const updateProfileValidation = [
  param("id")
    .isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const profile = await ProfileModel.findByPk(id);
      if (!profile) throw new Error("Perfil no encontrado");
      return true;
    }),
  body("bio").optional().isString().withMessage("La bio debe ser texto"),
  body("avatar").optional().isString().withMessage("El avatar debe ser texto"),
];

// Eliminar perfil
export const deleteProfileValidation = [
  param("id")
    .isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const profile = await ProfileModel.findByPk(id);
      if (!profile) throw new Error("Perfil no encontrado");
      return true;
    }),
];