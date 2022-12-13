import { categoriesSchema } from "../model/categoriesModel.js";
import connection from "../database/db.js";

export async function categoriesSchemaValidation(req, res, next) {
  const { name } = req.body;

  const { error } = categoriesSchema.validate({ name }, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  const existingName = await connection.query(
    "SELECT * FROM categories WHERE name LIKE $1",
    [`${name}%`]
  );

  if (existingName.rowCount > 0) {
    return res.status(409).send("Essa categoria já existe!");
  }

  next();
}
