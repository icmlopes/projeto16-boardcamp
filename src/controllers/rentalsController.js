export async function postRental(req, res) {}

// export async function deleteRental(req, res) {
//   const { id } = req.query;

//   try {
//     const existingId = await connection.query(
//       "SELECT * FROM rentals WHERE id LIKE $1",
//       [`${id}%`]
//     );

//     if (existingId.rowCount > 0) {
//       return res.sendStatus(404);
//     }

//     const deleteRental = await connection.query(
//       "DELETE FROM rentals WHERE id = $1", [id]
//     );

//     res.sendStatus(200)
//   } catch {
//     console.log(error);
//     res.sendStatus(500);
//   }
// }
