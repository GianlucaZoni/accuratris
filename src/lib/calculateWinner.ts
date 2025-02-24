import { Player } from "./types"

const WINNING_LINES = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal
  [0, 4, 8],
  [2, 4, 6],
]

export function calculateWinner(cellState: (null | Player)[]): null | Player {


  if (!cellState) return null

  /* for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i]
    if (cellState[a] && cellState[a] === cellState[b] && cellState[a] === cellState[c]) {
      return cellState[a]
    }
  } */

  const winningLine = WINNING_LINES.find(([a, b, c]) => {
    return cellState[a] && cellState[a] === cellState[b] && cellState[a] === cellState[c]
  }

  )
  return winningLine !== undefined ? cellState[winningLine[0]] : null

}
