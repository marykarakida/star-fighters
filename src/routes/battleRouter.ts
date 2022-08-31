import { Router } from "express";

import validateSchema from "../middlewares/schemaMiddleware.js";
import createBattle from "../controller/battleController.js";

const router = Router();

router.post("/", validateSchema("battleSchema"), createBattle)

export default router;