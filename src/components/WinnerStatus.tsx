import styles from "./WinnerStatus.module.css"
//import { useGameContext } from "../GameContext"
import { useRootStateContext } from "../state"

export function WinnerStatus() {
  //const { winner, isDraw } = useGameContext()
  const { winner, isDraw } = useRootStateContext()
  const winnerStatus = winner ? `Player ${winner} wins!` : isDraw ? "It's a draw!" : null

  return <div className={styles.winnerStatus}>{winnerStatus}</div>
}
