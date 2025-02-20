import { useState, useEffect } from "react"

import styles from "./Board.module.css"
import { Cell } from "./Cell"
import { handleWinState } from "./WinState"
import { Player } from "../lib/types"
import { setFaviconWithChar } from "../lib/setFaviconWithChar"

export function Board() {
  //const [cellState, setCellState] = useState<(null | Player)[]>(Array(9).fill(null))
  const [history, setHistory] = useState<(null | Player)[][]>([Array(9).fill(null)])

  const [currentMove, setCurrentMove] = useState(0)
  const isXTurn = currentMove % 2 === 0
  //const [isXTurn, setIsXTurn] = useState(true)

  function handleGame(newCellState: (null | Player)[]) {
    //const nextMove: (null | Player)[] = [...cellState.slice(0, currentMove + 1), newCellState]
    const nextMove = [...history.slice(0, currentMove + 1), newCellState]
    setHistory(nextMove)
    setCurrentMove(nextMove.length - 1)
    //setIsXTurn(!isXTurn)
  }

  function timeTravelTo(move: number) {
    setCurrentMove(move)
    //setIsNext(nextTurn%2===0)
  }

  const historyList = history.map((_, move) => {
    const textDescription = move > 0 ? "Travel to Turn " + { move } : "Travel to Game Start"

    return (
      <li key={move}>
        <button onClick={() => timeTravelTo(move)}>{textDescription}</button>
      </li>
    )
  })

  useEffect(() => {
    setFaviconWithChar(isXTurn ? "❌" : "⭕")
  }, [isXTurn])

  function handleState(index: number) {
    const currentCells = history[currentMove]
    /* if (history[index] !== null || handleWinState(currentCells)) {
      return
    } */
    if (currentCells[index] !== null || handleWinState(currentCells)) {
      return
    }
    //const history = cellState()
    const newCellState = [...currentCells]
    newCellState[index] = isXTurn ? "X" : "O"
    handleGame(newCellState)
    /* setCellState(newCellState)
    setIsXTurn(!isXTurn) */
  }

  const currentCells = history[currentMove]
  const winner = handleWinState(currentCells)
  const isDraw = !winner && currentCells.every((cell) => cell !== null)
  const winnerStatus = winner ? `Player ${winner} wins!` : isDraw ? "It's a draw!" : null

  return (
    <>
      <div className={styles.board}>
        {currentCells.map((cellValue, index) => (
          <Cell key={index} cellValue={cellValue} onCellClick={() => handleState(index)} />
        ))}
      </div>
      <div className={styles.winnerStatus}>{winnerStatus}</div>
      <div className="history">
        <ol>{historyList}</ol>
      </div>
    </>
  )
}
