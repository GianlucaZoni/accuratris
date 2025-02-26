import { useEffect } from "react"
import { range } from "lodash"

import styles from "./Board.module.css"
import { Cell } from "./Cell"
import { calculateWinner } from "../lib/calculateWinner"
import { Player } from "../lib/types"
import { setFaviconWithChar } from "../lib/setFaviconWithChar"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { TimeMachine } from "./TimeMachine"
import { Controls } from "./Controls"
import { MovesContext } from "../lib/MovesContext"

export function Board() {
  const [playerMoves, setPlayerMoves] = useLocalStorage("playerMoves", [])

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
  const winnerStatus = winner ? `Player ${winner} wins!` : isDraw ? "It's a draw!" : null

  return (
    <>
      <MovesContext.Provider value={playerMoves}>
        <div className={styles.board}>
          {updatedBoardCells.map((playerMove, index) => (
            <Cell key={index} cellValue={playerMove} onCellClick={() => handleCellClick(index)} />
          ))}
        </div>
        <div className={styles.winnerStatus}>{winnerStatus}</div>
        <TimeMachine playerMoves={playerMoves} timeTravelTo={timeTravelTo} />
        <Controls playerMoves={playerMoves} timeTravelTo={timeTravelTo} />
      </MovesContext.Provider>

      {/* <pre>{JSON.stringify({ playerMoves, updatedBoardCells }, null, 2)}</pre> */}
    </>
  )
}
