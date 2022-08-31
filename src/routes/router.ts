import { Router } from "express";

import battleRouter from "./battleRouter.js"

const router = Router();

router.use("/battle", battleRouter)

export default router;