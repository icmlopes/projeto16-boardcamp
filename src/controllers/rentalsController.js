import dayjs from "dayjs";
import connection from "../database/db.js";

export async function postRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const existingCustomerId = await connection.query(
      "SELECT * FROM customers WHERE id = $1",
      [customerId]
    );

    if (existingCustomerId.rowCount === 0) {
      return res.sendStatus(400);
    }

    const rentDate = dayjs().format("YYYY-MM-DD");

    const findGame = await connection.query(
      "SELECT * FROM games WHERE id = $1",
      [gameId]
    );

    if (findGame.rowCount === 0) {
      return res.sendStatus(400);
    }

    const gamePrice = findGame.rows[0].pricePerDay;

    const originalPrice = daysRented * gamePrice;

    await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
    );

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function getRental(req, res) {
  try {
    const showRentals = await connection.query(
      `SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName", categories.id AS "categoryId", categories.name AS "categoryName"
      FROM rentals 
        JOIN customers 
            ON rentals."customerId" = customers.id 
        JOIN games 
            ON rentals."gameId" = games.id 
        JOIN categories 
            ON games."categoryId" = categories.id`
    );

    const result = showRentals.rows.map((r) => {
      return {
        id: r.id,
        customerId: r.customerId,
        gameId: r.gameId,
        rentDate: dayjs(r.rentDate).format("YYYY-MM-DD"),
        daysRented: r.daysRented,
        returnDate: r.returnDate,
        originalPrice: r.originalPrice,
        delayFee: r.delayFee,
        customer: {
          id: r.customerId,
          name: r.customerName,
        },
        game: {
          id: r.gameId,
          name: r.gameName,
          categoryId: r.categoryId,
          categoryName: r.categoryName,
        },
      };
    });
    return res.send(result).status(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

// export async function finishRentPost(req, res) {
//   try {
//   } catch (err) {
//     res.sendStatus(500);
//   }
// }

export async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    const existingId = await connection.query(
      "SELECT * FROM rentals WHERE id = $1",
      [id]
    );

    if (existingId.rowCount === 0) {
      return res.sendStatus(404);
    }

    const deleteRental = await connection.query(
      `DELETE FROM rentals WHERE id = $1`,
      [id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
