import { useContext } from "react"

import { MovesContext, useMovesContext } from "./MovesContext"
import styles from "./Controls.module.css"

export function Controls() {
  const { playerMoves, timeTravelTo } = useMovesContext()
  return (
    <div className={styles.controls}>
      <div onClick={() => timeTravelTo(playerMoves.length - 1)}>Undo</div>
      <div> | </div>
      <div onClick={() => timeTravelTo(0)}>Retry</div>
    </div>
  )
}
