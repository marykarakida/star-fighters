import * as fighterRepository from "../repositories/fighterRepository.js"

export async function getRanking() {
    const ranking = await fighterRepository.fetchRanking()

    return ranking
}