import { useContext } from "react"

import styles from "./TimeMachine.module.css"

import { MovesContext, useMovesContext } from "./MovesContext"

export function TimeMachine() {
  const { playerMoves, timeTravelTo } = useMovesContext()
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
