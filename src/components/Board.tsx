import { useState, useEffect } from "react"
import { range } from "lodash"

import styles from "./Board.module.css"
import { Cell } from "./Cell"
import { calculateWinner } from "../lib/calculateWinner"
import { Player } from "../lib/types"
import { setFaviconWithChar } from "../lib/setFaviconWithChar"
import { PlayerMove } from "../lib/types"

export function Board() {
  const [playerMoves, setPlayerMoves] = useState<PlayerMove[]>([])

  //const boardCells: (null | Player)[] = Array(9).fill(null)
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
      <div className={styles.board}>
        {updatedBoardCells.map((playerMove, index) => (
          <Cell key={index} cellValue={playerMove} onCellClick={() => handleCellClick(index)} />
        ))}
      </div>
      <div className={styles.winnerStatus}>{winnerStatus}</div>
      <div className={styles.history}>
        <h3>{playerMoves.length > 0 ? `Time Machine` : null}</h3>
        <ol>
          {playerMoves.map((move, moveIndex) => (
            <li key={moveIndex}>
              <button onClick={() => timeTravelTo(moveIndex)}>
                {/* {`Travel to Turn ${moveIndex + 1} in cell ${move.pos} by ${move.player}`} */}
                Travel to Turn {moveIndex + 1} in cell {move.pos} by {move.player}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.controls}>
        <div onClick={() => timeTravelTo(playerMoves.length - 1)}>Undo</div>
        <div> | </div>
        <div onClick={() => timeTravelTo(0)}>Retry</div>
      </div>

      {/* <pre>{JSON.stringify({ playerMoves, updatedBoardCells }, null, 2)}</pre> */}
    </>
  )
}
