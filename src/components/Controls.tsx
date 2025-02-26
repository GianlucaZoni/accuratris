import styles from "./Controls.module.css"
import { PlayerMove } from "../lib/types"

interface TimeMachineProps {
  playerMoves: PlayerMove[]
  timeTravelTo: (moveIndex: number) => void
}

export function Controls({ playerMoves, timeTravelTo }: TimeMachineProps) {
  return (
    <div className={styles.controls}>
      <div onClick={() => timeTravelTo(playerMoves.length - 1)}>Undo</div>
      <div> | </div>
      <div onClick={() => timeTravelTo(0)}>Retry</div>
    </div>
  )
}
