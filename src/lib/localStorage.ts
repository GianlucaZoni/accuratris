import { PlayerMove } from "./types"

export function storePlayerMoves(key: string, value: PlayerMove[]) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.log(error)
    }
}

export function loadPlayerMoves(key: string) {
    try {
        const playerMoves = window.localStorage.getItem(key)
        return playerMoves ? JSON.parse(playerMoves) : null
    } catch (error) {
        console.log(error)
    }
}