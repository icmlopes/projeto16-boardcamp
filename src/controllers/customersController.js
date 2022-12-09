import connection from "../database/db.js";

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  const newClient = await connection.query(
    "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
    [name, phone, cpf, birthday]
  );

  console.log(newClient);
  res.send(newClient);

  res.sendStatus(201);
}
