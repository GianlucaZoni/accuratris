//import {useState} from 'react';
import styles from "./Cell.module.css"
import { Player } from "../lib/types"

interface CellProps {
  cellValue: Player | null
  onCellClick: () => void
}

export function Cell({ cellValue, onCellClick }: CellProps) {
  return (
    <div className={styles.cell} onClick={onCellClick}>
      {cellValue}
    </div>
  )
}
