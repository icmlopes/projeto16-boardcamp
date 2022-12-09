import { customersSchema } from "../model/customersModel.js";

export function customersSchemaValidation(req, res, next) {
  const { name, phone, cpf, birthday } = req.body;

  const { error } = customersSchema.validate(
    { name, phone, cpf, birthday },
    {
      abortEarly: false,
    }
  );

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  //   if (customerData === null) {
  //     res.status(400).send("Esse espaço não pode ser vazio.");
  //     return;
  //   }

  //fazer a validação do não pode ter o mesmo CPF cadastrado

  next();
}
