import { createContext, ReactNode, useContext, useEffect } from "react"
import { range } from "lodash"

import { Player, PlayerMove } from "./lib/types"
import { useLocalStorage } from "./hooks/useLocalStorage"

import { calculateWinner } from "./lib/calculateWinner"
import { setFaviconWithChar } from "./lib/setFaviconWithChar"

interface GameContextValue {
  playerMoves: PlayerMove[]
  timeTravelTo: (moveIndex: number) => void
  winner: null | Player
  isDraw: boolean
  updatedBoardCells: (null | Player)[]
  handleCellClick: (cellposition: number) => void
}

interface GameContextProviderProps {
  children: ReactNode
}

export const GameContext = createContext<GameContextValue | null>(null)

export function useGameContext() {
  const contextValue = useContext(GameContext)
  if (contextValue === null) throw new Error("MoveContext non inizializzato")
  return contextValue
}

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [playerMoves, setPlayerMoves] = useLocalStorage<PlayerMove[]>("playerMoves", [])

  const updatedBoardCells = playerMoves.reduce<(null | Player)[]>(
    (acc, move) => {
      const newBoard = [...acc]
      newBoard[move.pos] = move.player
      return newBoard
    },
    range(9).map(() => null)
  )

  const isXTurn = playerMoves.length % 2 === 0

  function timeTravelTo(moveIndex: number) {
    setPlayerMoves(playerMoves.slice(0, moveIndex))
  }

  useEffect(() => {
    setFaviconWithChar(isXTurn ? "❌" : "⭕")
  }, [isXTurn])

  function handleCellClick(cellPosition: number) {
    if (updatedBoardCells[cellPosition] !== null || winner || isDraw) return
    const currentPlayer: Player = isXTurn ? "X" : "O"

    const currentPlayerMove = {
      pos: cellPosition,
      player: currentPlayer,
    }

    setPlayerMoves([...playerMoves, currentPlayerMove])
  }

  const winner = calculateWinner(updatedBoardCells)
  const isDraw = !winner && updatedBoardCells.every((cell) => cell !== null)

  return (
    <GameContext.Provider
      value={{
        playerMoves,
        timeTravelTo,
        winner,
        isDraw,
        updatedBoardCells,
        handleCellClick,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
