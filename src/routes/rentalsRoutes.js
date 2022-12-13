import { Router } from "express";

const router = Router();

router.post("/rentals");
router.post("/rentals/:id/return");
router.get("/rentals");
router.delete("/rentals/:id");

export default router;
