import styles from "./Board.module.css"
import { Cell } from "./Cell"
import { TimeMachine } from "./TimeMachine"
import { Controls } from "./Controls"
import { WinnerStatus } from "./WinnerStatus"
import { useGameContext } from "../GameContext"

export function Board() {
  const { updatedBoardCells, handleCellClick } = useGameContext()

  return (
    <>
      <div className={styles.board}>
        {updatedBoardCells.map((playerMoves, index) => (
          <Cell key={index} cellValue={playerMoves} onCellClick={() => handleCellClick(index)} />
        ))}
      </div>
      <WinnerStatus />
      <TimeMachine />
      <Controls />
    </>
  )
}
