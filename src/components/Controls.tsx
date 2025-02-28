//import { useGameContext } from "../GameContext"
import { useRootStateContext } from "../state"
import styles from "./Controls.module.css"

export function Controls() {
  //const { playerMoves, timeTravelTo } = useGameContext()
  const { playerMoves, timeTravelTo } = useRootStateContext()
  return (
    <div className={styles.controls}>
      <div onClick={() => timeTravelTo(playerMoves.length - 1)}>Undo</div>
      <div> | </div>
      <div onClick={() => timeTravelTo(0)}>Retry</div>
    </div>
  )
}
