import {body, param} from "express-validator";

import UserModel from "../../models/users.models.js";

//obtener usuario por id
export const getUserByPkValidations = [
  param('id')
    .isInt().withMessage('El id debe ser un entero')
    .custom(async (value) => {
      const user = await UserModel.findByPk(value); 
      if (!user) {
        throw new Error('No existe un usuario con ese id');
      }
    }),

];

//crear el usuario
export const createUserValidation = [
  body("name")
    .notEmpty().withMessage("El nombre es obligatorio")
    .isString().withMessage("El nombre debe ser texto"),
  body("email")
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Email invalido")
    .custom(async (email) => {
      const user = await UserModel.findOne({ where: { email } });
      if (user) throw new Error("El email ya está en uso");
      return true;
    }),
  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
];

//actualizar usuario
export const updateUserValidation = [ 
param("id").isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) throw new Error("Usuario no encontrado");
      return true;
    }),
  body("name").optional().notEmpty().withMessage("El nombre no puede estar vacío"),
  body("email").optional().isEmail().withMessage("Email inválido"),
  body("password").optional().isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
];

//eliminar usuario
export const deleteUserValidation = [
  param("id").isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) throw new Error("Usuario no encontrado");
      return true;
    }),
];

