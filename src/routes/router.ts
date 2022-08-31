import { Router } from "express";

import battleRouter from "./battleRouter.js"
import rankingRouter from "./rankingRouter.js"

const router = Router();

router.use("/battle", battleRouter)

router.use("/ranking", rankingRouter)

export default router;