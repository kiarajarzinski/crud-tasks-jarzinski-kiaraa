import { validationResult } from "express-validator";

//maneja los errores de las validaciones
export const validator = (req, res, next) => {
  const result = validationResult(req);

  //si hay errores responde 
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.mapped() });
    }

        //si no hay errores continua
        next();
    };