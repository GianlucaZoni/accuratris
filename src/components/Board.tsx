import { useState, useEffect } from "react"

import styles from "./Board.module.css"
import { Cell } from "./Cell"
import { handleWinState } from "./WinState"
import { Player } from "../lib/types"
import { setFaviconWithChar } from "../lib/setFaviconWithChar"
import { PlayerMove } from "../lib/types"

export function Board() {
  const [playerMoves, setPlayerMoves] = useState<PlayerMove[]>([])
  //const [currentMove, setCurrentMove] = useState<number>(0)

  const boardCells: (null | Player)[] = Array(9).fill(null)
  playerMoves.map((move) => {
    boardCells[move.pos] = move.player
  })

  //const currentMove = playerMoves.length
  //const isXTurn = currentMove % 2 === 0
  const isXTurn = playerMoves.length % 2 === 0

  function timeTravelTo(moveIndex: number) {
    //setCurrentMove(moveIndex)
    setPlayerMoves(playerMoves.slice(0, moveIndex))
  }

  useEffect(() => {
    setFaviconWithChar(isXTurn ? "❌" : "⭕")
  }, [isXTurn])

  function handleState(cellPosition: number) {
    if (boardCells[cellPosition] !== null || winner || isDraw) return
    const currentPlayer: Player = isXTurn ? "X" : "O"

    const currentPlayerMove = {
      pos: cellPosition,
      player: currentPlayer,
    }

    setPlayerMoves([...playerMoves, currentPlayerMove])
    //setCurrentMove(currentMove + 1)
  }

  const winner = handleWinState(boardCells)
  const isDraw = !winner && boardCells.every((cell) => cell !== null)
  const winnerStatus = winner ? `Player ${winner} wins!` : isDraw ? "It's a draw!" : null

  return (
    <>
      <div className={styles.board}>
        {boardCells.map((playerMove, index) => (
          <Cell key={index} cellValue={playerMove} onCellClick={() => handleState(index)} />
        ))}
      </div>
      <div className={styles.winnerStatus}>{winnerStatus}</div>
      <div className={styles.history}>
        <h3>Time Machine</h3>
        <ol>
          {playerMoves.map((move, moveIndex) => (
            <li key={moveIndex}>
              <button onClick={() => timeTravelTo(moveIndex)}>
                {`Travel to Turn ${moveIndex + 1} in cell ${move.pos} by ${move.player}`}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <pre>{JSON.stringify({ playerMoves, boardCells }, null, 2)}</pre>
    </>
  )
}
