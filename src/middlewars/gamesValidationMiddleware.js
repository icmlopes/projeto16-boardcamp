import { gamesSchema } from "../model/gamesModel.js";
import connection from "../database/db.js";

export async function gamesSchemaValidation(req, res, next) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  const { error } = gamesSchema.validate(
    { name, image, stockTotal, categoryId, pricePerDay },
    {
      abortEarly: false,
    }
  );

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  const existingName = await connection.query(
    "SELECT * FROM games WHERE name LIKE $1",
    [`${name}%`]
  );

  if (existingName.rowCount > 0) {
    return res.status(409).send("Já temos esse jogo em nosso sistema!");
  }

  //fazer a validação do id, se ele já for existente

  next();
}
