import { Router } from "express";

import getRanking from "../controller/rankingController.js";

const router = Router();

router.get("/", getRanking)

export default router;