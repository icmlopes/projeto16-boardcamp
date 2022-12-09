import { Router } from "express";
import {
  postCategory,
  getCategory,
} from "../controllers/categoriesController.js";
import { categoriesSchemaValidation } from "../middlewars/categoriesValidationMiddleware.js";

const router = Router();

router.post("/categories", categoriesSchemaValidation, postCategory);
router.get("/categories", getCategory);

export default router;
