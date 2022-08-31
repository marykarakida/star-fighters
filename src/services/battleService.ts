import axios from "axios";

import * as fighterRepository from "../repositories/fighterRepository.js"

export async function createBattle(firstUser: string, secondUser: string) {
    let firstFighter = await fighterRepository.findByUsername(firstUser)
    if (!firstFighter) {
        firstFighter = await fighterRepository.insert(firstUser)
    }

    let secondFighter = await fighterRepository.findByUsername(secondUser)
    if (!secondFighter) {
        secondFighter = await fighterRepository.insert(secondUser)
    }

    const firstUserGitHub = await axios.get(`https://api.github.com/users/${firstUser}/repos`)
    const firstUserStarsCount = firstUserGitHub.data.reduce((prev, cur: number) => prev + cur["stargazers_count"], 0)

    const secondUserGitHub = await axios.get(`https://api.github.com/users/${secondUser}/repos`)
    const secondUserStarsCount = secondUserGitHub.data.reduce((prev, cur: number) => prev + cur["stargazers_count"], 0)

    const result = {winner: null, loser: null, draw: false}

    if (firstUserStarsCount > secondUserStarsCount) {
        await fighterRepository.update(firstUser, {wins: firstFighter.wins + 1 })
        await fighterRepository.update(secondUser, {losses: secondFighter.losses + 1 })
        result.winner = firstUser
        result.loser = secondUser
    } else if (firstUserStarsCount < secondUserStarsCount) {
        await fighterRepository.update(firstUser, {losses: firstFighter.losses + 1 })
        await fighterRepository.update(secondUser, {wins: secondFighter.wins + 1 })
        result.loser = firstUser
        result.winner = secondUser
    } else {
        await fighterRepository.update(firstUser, {draws: firstFighter.draws + 1 })
        await fighterRepository.update(secondUser, {draws: secondFighter.draws + 1 })
        result.draw = true
    }

    return result
}