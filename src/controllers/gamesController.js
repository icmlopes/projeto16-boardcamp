import connection from "../database/db.js";

export async function postGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  const newCategory = await connection.query(
    'INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
    [name, image, stockTotal, categoryId, pricePerDay]
  );

  console.log(newCategory);
  res.send(newCategory);

  res.sendStatus(201);
}

export async function getGames(req, res) {
  const { name } = req.query;

  try {
    if (name) {
      const showByname = await connection.query(
        "SELECT * FROM games WHERE name LIKE $1",
        [`${name}%`]
      );
      console.log(showByname);
      res.send(showByname.rows);
      return;
    }
    const showGames = await connection.query("SELECT * FROM games");
    res.send(showGames.rows);
  } catch {
    console.log(error);
    res.sendStatus(500);
  }

  //falta inserir o nome da categoria
}
