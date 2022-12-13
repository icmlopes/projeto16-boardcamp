import { Router } from "express";
import {
  deleteRental,
  getRental,
  postRental,
} from "../controllers/rentalsController.js";
import { rentalsSchemaValidation } from "../middlewars/rentalsValidationMiddleware.js";

const router = Router();

router.post("/rentals", rentalsSchemaValidation, postRental);
router.post("/rentals/:id/return");
router.get("/rentals", getRental);
router.delete("/rentals/:id", deleteRental);

export default router;
