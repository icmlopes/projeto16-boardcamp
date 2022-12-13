import { categoriesSchema } from "../model/categoriesModel.js";
import connection from "../database/db.js";

export async function categoriesSchemaValidation(req, res, next) {
  const { name } = req.body;

  const { error } = categoriesSchema.validate({ name }, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  next();
}
