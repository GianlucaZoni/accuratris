//import { useState } from 'react'
import styles from "./App.module.css"

import { Board } from "./components/Board"

function App() {
  return (
    <>
      <div className={styles.wrapper}>
        <h1>Tic Tac Toe</h1>
        <Board />
      </div>
    </>
  )
}

export default App
