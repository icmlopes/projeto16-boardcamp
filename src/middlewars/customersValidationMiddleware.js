import { customersSchema } from "../model/customersModel.js";
import connection from "../database/db.js";

export async function customersSchemaValidation(req, res, next) {
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

  const existingCpf = await connection.query(
    "SELECT * FROM customers WHERE cpf LIKE $1",
    [`${cpf}%`]
  );

  if (existingCpf.rowCount > 0) {
    return res.status(409).send("Esse CPF já existe em nosso sistema!");
  }
  
  next();
}
