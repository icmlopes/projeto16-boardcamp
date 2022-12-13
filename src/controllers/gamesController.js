import connection from "../database/db.js";

export async function postGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  const existingName = await connection.query(
    "SELECT * FROM games WHERE name LIKE $1",
    [`${name}%`]
  );

  if (existingName.rowCount > 0) {
    return res.status(409).send("Já temos esse jogo em nosso sistema!");
  }

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

    const categoryName = await connection.query(
      `SELECT
        games.*, categories.name AS "categoryName" 
      FROM games 
      JOIN categories 
        ON games."categoryId" = categories.id`
    );

    res.send(categoryName.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
