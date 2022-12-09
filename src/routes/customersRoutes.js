import { Router } from "express";
import { postCustomer } from "../controllers/customersController.js";
import { customersSchemaValidation } from "../middlewars/customersValidationMiddleware.js";

const router = Router();

router.post("/customers", customersSchemaValidation, postCustomer);
// router.get("/customers");

export default router;
