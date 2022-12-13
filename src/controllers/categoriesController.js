import connection from "../database/db.js";

export async function postCategory(req, res) {
  const { name } = req.body;

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
  } catch {
    console.log(error);
    res.sendStatus(500);
  }
}
