import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesController.js";
import { gamesSchemaValidation } from "../middlewars/gamesValidationMiddleware.js";

const router = Router();

router.post("/games", gamesSchemaValidation, postGames);
router.get("/games", getGames);

export default router;
