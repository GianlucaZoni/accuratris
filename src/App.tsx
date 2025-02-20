//import { useState } from 'react'
import "./App.css";

import { Board } from "./components/Board";

function App() {
  return (
    <>
      <div className="wrapper">
        <h1>Tic Tac Toe</h1>
        <Board />
        <div className="controls">Coming Soon: Undo, Retry</div>
      </div>
    </>
  );
}

export default App;
