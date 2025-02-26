import { useContext } from "react"
import styles from "./WinnerStatus.module.css"
import { useMovesContext } from "./MovesContext"

export function WinnerStatus() {
  const { winner, isDraw } = useMovesContext()
  const winnerStatus = winner ? `Player ${winner} wins!` : isDraw ? "It's a draw!" : null

  return <div className={styles.winnerStatus}>{winnerStatus}</div>
}
