import { createContext, useContext } from "react"
import { Player, PlayerMove } from "../lib/types"

interface ContextValue {
  playerMoves: PlayerMove[]
  timeTravelTo: (moveIndex: number) => void
  winner: null | Player
  isDraw: boolean
}

export const MovesContext = createContext<ContextValue | null>(null)

export function useMovesContext() {
  const contextValue = useContext(MovesContext)
  if (contextValue === null) throw new Error("MoveContext non inizializzato")
  return contextValue
}
