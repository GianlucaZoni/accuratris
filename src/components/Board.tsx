import { useEffect } from "react"
import { range } from "lodash"

import styles from "./Board.module.css"
import { Cell } from "./Cell"
import { calculateWinner } from "../lib/calculateWinner"
import { Player, PlayerMove } from "../lib/types"
import { setFaviconWithChar } from "../lib/setFaviconWithChar"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { TimeMachine } from "./TimeMachine"
import { Controls } from "./Controls"
import { MovesContext } from "./MovesContext"
import { WinnerStatus } from "./WinnerStatus"

export function Board() {
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
    <>
      <MovesContext.Provider value={{ playerMoves, timeTravelTo, winner, isDraw }}>
        <div className={styles.board}>
          {updatedBoardCells.map((playerMove, index) => (
            <Cell key={index} cellValue={playerMove} onCellClick={() => handleCellClick(index)} />
          ))}
        </div>
        <WinnerStatus />
        <TimeMachine />
        <Controls />
      </MovesContext.Provider>

      {/* <pre>{JSON.stringify({ playerMoves, updatedBoardCells }, null, 2)}</pre> */}
    </>
  )
}
