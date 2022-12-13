import connection from "../database/db.js";
import { rentalsSchema } from "../model/rentalsModel.js";

export async function rentalsSchemaValidation(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const { error } = rentalsSchema.validate(
      { customerId, gameId, daysRented },
      {
        abortEarly: false,
      }
    );

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
