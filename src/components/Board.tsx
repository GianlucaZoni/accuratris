import { useState, useEffect } from "react";
import "./Board.css";

import { Cell } from "./Cell";
import { handleWinState } from "./WinState";

export function Board() {
  const [isXTurn, setIsXTurn] = useState(true);
  const [cellState, setCellState] = useState(Array(9).fill(null));

  // Inspired by "Defender of the Favicon" by Mathieu 'p01' Henri
  // https://www.p01.org/defender_of_the_favicon/

  useEffect(() => {
    setFavicon(isXTurn ? "❌" : "⭕");
  }, [isXTurn]);

  function setFavicon(emoji: string) {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.font = "24px sans-serif";
      ctx.fillText(emoji, 4, 24);
    }
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.setAttribute("type", "image/x-icon");
    link.setAttribute("rel", "shortcut icon");
    link.setAttribute("href", canvas.toDataURL());
    document.head.appendChild(link);
  }

  function handleState(index: number) {
    // If the cell is already filled,
    // return early to avoid overwriting a X or O
    if (cellState[index] !== null || handleWinState(cellState)) {
      return;
    }
    const newCellState = [...cellState];
    if (isXTurn) {
      newCellState[index] = "X";
    } else {
      newCellState[index] = "O";
    }
    setCellState(newCellState);
    setIsXTurn(!isXTurn);
  }

  const winner = handleWinState(cellState);
  const isDraw = !winner && cellState.every((cell) => cell !== null);
  const winnerStatus = winner
    ? `Player ${winner} wins!`
    : isDraw
    ? "It's a draw!"
    : null;

  return (
    <>
      <div className="board">
        <Cell
          className="right-border bottom-border"
          cellValue={cellState[0]}
          onCellClick={() => handleState(0)}
        />
        <Cell
          className="right-border bottom-border"
          cellValue={cellState[1]}
          onCellClick={() => handleState(1)}
        />
        <Cell
          className="bottom-border"
          cellValue={cellState[2]}
          onCellClick={() => handleState(2)}
        />
        <Cell
          className="right-border bottom-border"
          cellValue={cellState[3]}
          onCellClick={() => handleState(3)}
        />
        <Cell
          className="right-border bottom-border"
          cellValue={cellState[4]}
          onCellClick={() => handleState(4)}
        />
        <Cell
          className="bottom-border"
          cellValue={cellState[5]}
          onCellClick={() => handleState(5)}
        />
        <Cell
          className="right-border"
          cellValue={cellState[6]}
          onCellClick={() => handleState(6)}
        />
        <Cell
          className="right-border"
          cellValue={cellState[7]}
          onCellClick={() => handleState(7)}
        />
        <Cell
          className=""
          cellValue={cellState[8]}
          onCellClick={() => handleState(8)}
        />
      </div>
      <div className="winnerStatus">{winnerStatus}</div>
    </>
  );
}
