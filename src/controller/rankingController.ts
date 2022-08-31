import { Request, Response } from "express"

import * as rankingService from "../services/rankingService.js"

export default async function getRanking(req:Request, res: Response) {
    const ranking = await rankingService.getRanking()

    res.status(201).send(ranking)
}