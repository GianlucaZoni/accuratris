import { useState, useEffect } from "react"

import styles from "./Board.module.css"
import { Cell } from "./Cell"
import { handleWinState } from "./WinState"
import { Player } from "../lib/types"
import { setFaviconWithChar } from "../lib/setFaviconWithChar"

export function Board() {
  const [isXTurn, setIsXTurn] = useState(true)
  const [cellState, setCellState] = useState<(null | Player)[]>(Array(9).fill(null))

  useEffect(() => {
    setFaviconWithChar(isXTurn ? "❌" : "⭕")
  }, [isXTurn])

  function handleState(index: number) {
    // If the cell is already filled,
    // return early to avoid overwriting a X or O
    if (cellState[index] !== null || handleWinState(cellState)) {
      return
    }
    //const history = cellState()
    const newCellState = [...cellState]
    if (isXTurn) {
      newCellState[index] = "X"
    } else {
      newCellState[index] = "O"
    }
    setCellState(newCellState)
    setIsXTurn(!isXTurn)
  }

  const winner = handleWinState(cellState)
  const isDraw = !winner && cellState.every((cell) => cell !== null)
  const winnerStatus = winner ? `Player ${winner} wins!` : isDraw ? "It's a draw!" : null

  return (
    <>
      <div className={styles.board}>
        {cellState.map((cellValue, index) => (
          <Cell key={index} cellValue={cellValue} onCellClick={() => handleState(index)} />
        ))}
      </div>
      <div className={styles.winnerStatus}>{winnerStatus}</div>
    </>
  )
}
