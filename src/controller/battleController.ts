import { Request, Response } from "express"

import * as battleService from "../services/battleService.js"

export default async function createBattle(req:Request, res: Response) {
    const {firstUser, secondUser} = req.body;

    const result = await battleService.createBattle(firstUser, secondUser)

    res.status(201).send(result)
}