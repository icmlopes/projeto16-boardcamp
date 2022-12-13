import { gamesSchema } from "../model/gamesModel.js";

export function gamesSchemaValidation(req, res, next) {
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

  //fazer a validação do id, se ele já for existente

  //fazer a validação do name, não pode ser repetido

  next();
}
