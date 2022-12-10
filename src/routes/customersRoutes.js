import { Router } from "express";
import {
  getCustomer,
  postCustomer,
  getCustomerById,
  putCustomerById,
} from "../controllers/customersController.js";
import { customersSchemaValidation } from "../middlewars/customersValidationMiddleware.js";

const router = Router();

router.post("/customers", customersSchemaValidation, postCustomer);
router.get("/customers", getCustomer);
router.get("/customers/:id", getCustomerById);
router.put("/customers/:id", customersSchemaValidation, putCustomerById);

export default router;
