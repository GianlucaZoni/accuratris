//import {useState} from 'react';
import styles from "./Cell.module.css"
import { Player } from "../lib/types"
import { observer } from "mobx-react-lite"
//import { observer } from "mobx-react-lite"

interface CellProps {
  cellValue: Player | null
  onCellClick: () => void
}

export const Cell = observer(({ cellValue, onCellClick }: CellProps) => {
  return (
    <div className={styles.cell} onClick={onCellClick}>
      {cellValue}
    </div>
  )
})
