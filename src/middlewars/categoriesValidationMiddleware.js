import { categoriesSchema } from "../model/categoriesModel.js";

export function categoriesSchemaValidation(req, res, next) {
  const category = req.body.name;

  const { error } = categoriesSchema.validate(category, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  if (category === null) {
    res.status(400).send("Esse espaço não pode ser vazio.");
    return;
  }

  //fazer a validação do não pode ter uma categoria já existente com
  //o mesmo nome.

  next();
}
