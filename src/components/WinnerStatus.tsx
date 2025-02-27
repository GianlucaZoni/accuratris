import styles from "./WinnerStatus.module.css"
import { useGameContext } from "../GameContext"

export function WinnerStatus() {
  const { winner, isDraw } = useGameContext()
  const winnerStatus = winner ? `Player ${winner} wins!` : isDraw ? "It's a draw!" : null

  return <div className={styles.winnerStatus}>{winnerStatus}</div>
}
