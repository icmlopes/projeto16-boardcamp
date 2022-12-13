import connection from "../database/db.js";

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  const existingCpf = await connection.query(
    "SELECT * FROM customers WHERE cpf = $1",
    [cpf]
  );

  if (existingCpf.rowCount > 0) {
    return res.status(409).send("Esse CPF já existe em nosso sistema!");
  }

  const newClient = await connection.query(
    "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
    [name, phone, cpf, birthday]
  );

  console.log(newClient);
  res.send(newClient);

  res.sendStatus(201);
}

export async function getCustomer(req, res) {
  const { cpf } = req.query;

  try {
    if (cpf) {
      const showByCpf = await connection.query(
        "SELECT * FROM customers WHERE cpf LIKE $1",
        [`${cpf}%`]
      );
      console.log(showByCpf);
      res.send(showByCpf.rows);
      return;
    }
    const showCustomers = await connection.query("SELECT * FROM customers");
    res.send(showCustomers.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCustomerById(req, res) {
  const { id } = req.params;

  try {
    const showCustomers = await connection.query(
      "SELECT * FROM customers WHERE id = $1",
      [id]
    );
    res.send(showCustomers.rows);
  } catch {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function putCustomerById(req, res) {
  const { id } = req.params;

  const { name, phone, cpf, birthday } = req.body;

  const upDateClient = await connection.query(
    "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5",
    [name, phone, cpf, birthday, id]
  );
  console.log(upDateClient);
  res.send(upDateClient);
}
