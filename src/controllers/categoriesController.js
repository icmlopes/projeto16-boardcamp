import connection from "../database/db.js";

export async function postCategory(req, res) {
  const { name } = req.body;

  const existingName = await connection.query(
    "SELECT * FROM categories WHERE name LIKE $1",
    [`${name}%`]
  );

  if (existingName.rowCount > 0) {
    return res.status(409).send("Essa categoria já existe!");
  }

  const newCategory = await connection.query(
    "INSERT INTO categories (name) VALUES ($1)",
    [name]
  );

  console.log(newCategory);
  res.send(newCategory);

  res.sendStatus(201);
}

export async function getCategory(req, res) {
  try {
    const showCategories = await connection.query("SELECT * FROM categories");
    console.log(showCategories);
    res.send(showCategories.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
