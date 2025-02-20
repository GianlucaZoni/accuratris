import { Player } from "../lib/types"

export function handleWinState(cellState: Player | null) {
  const winningLines = [
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

  if (!cellState) return null

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i]
    if (cellState[a] && cellState[a] === cellState[b] && cellState[a] === cellState[c]) {
      return cellState[a]
    }
  }
  return null
}
