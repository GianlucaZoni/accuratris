import { Instance, types } from "mobx-state-tree";
import { Player, PlayerMove } from "../lib/types";
import { createContext, useContext } from "react";
import { calculateWinner } from "../lib/calculateWinner";
import { isNil } from "lodash";

/* const PlayerMoveModel = types.model("PlayerMoveModel", {
    pos: types.number,
    player: types.string
    // maybe here use literal X and O
}) */

const RootState = types.model("RootStateModel", {
    playerMoves: types.optional(types.frozen<PlayerMove[]>(), []),
    //playerMoves: types.optional(types.array(PlayerMoveModel), []),
    cell: types.maybe(types.frozen<Player>())
})
    .views((self) => ({
        get updatedBoardCells() {
            return self.playerMoves.reduce<(null | Player)[]>(
                (acc, move) => {
                    const newBoard = [...acc]
                    newBoard[move.pos] = move.player as Player
                    return newBoard
                },
                Array(9).fill(null)
            )
        }

    }))
    .views((self) => ({
        get isXTurn() {
            return self.playerMoves.length % 2 === 0
        }
    }))
    .views((self) => ({
        get winner() {
            return calculateWinner(self.updatedBoardCells)
        }

    }))
    .views((self) => ({
        get isDraw() {
            return !self.winner && self.updatedBoardCells.every((cell) => cell !== null)
        },
    }))
    .actions((self) => ({
        timeTravelTo(moveIndex: number) {
            //self.playerMoves.splice(moveIndex)
            self.playerMoves = self.playerMoves.slice(0, moveIndex)
        },
        handleCellClick(cellPosition: number) {
            if (self.updatedBoardCells[cellPosition] !== null || self.winner || self.isDraw) return
            const currentPlayer = self.isXTurn ? "X" : "O"
            const currentPlayerMove: PlayerMove = {
                pos: cellPosition, player: currentPlayer
            }
            //self.playerMoves.push({ pos: cellPosition, player: currentPlayer })
            self.playerMoves = [...self.playerMoves, currentPlayerMove]
        }

    }))

export interface RootStateInstance extends Instance<typeof RootState> { }

export const rootState = RootState.create()

export const RootStateContext = createContext<RootStateInstance | null>(null)

export function useRootStateContext() {
    const contextValue = useContext(RootStateContext)
    if (isNil(contextValue)) throw new Error("RootStateContext not initialized")
    return contextValue
}
