import { useContext } from "react"

import styles from "./TimeMachine.module.css"
import { PlayerMove } from "../lib/types"
import { MovesContext } from "../lib/MovesContext"

interface TimeMachineProps {
  playerMoves: PlayerMove[]
  timeTravelTo: (moveIndex: number) => void
}

export function TimeMachine({ timeTravelTo }: TimeMachineProps) {
  const playerMoves = useContext(MovesContext)
  return (
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
  )
}
