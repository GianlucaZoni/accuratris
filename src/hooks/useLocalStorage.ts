import { useState, useEffect } from "react"

import { storePlayerMoves, loadPlayerMoves } from "../lib/localStorage"
import { PlayerMove } from "../lib/types"

export function useLocalStorage(key: string, initialValue: PlayerMove[]) {
    const [playerMoves, setPlayerMoves] = useState<PlayerMove[]>(() => {
        return loadPlayerMoves("playerMoves") || initialValue
    })

    useEffect(() => {
        storePlayerMoves(key, playerMoves)
    }, [playerMoves])

    return [playerMoves, setPlayerMoves] as const
}