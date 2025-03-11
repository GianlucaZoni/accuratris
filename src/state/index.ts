import { IDisposer, Instance, types } from "mobx-state-tree";
import { Player, PlayerMove } from "../lib/types";
import { createContext, useContext } from "react";
import { calculateWinner } from "../lib/calculateWinner";
import { isNil } from "lodash";
import { autorun, reaction } from "mobx";
import { getLocalStorage, setLocalStorage } from "../lib/localStorage";
import { setFaviconWithChar } from "../lib/setFaviconWithChar";

const genericLifecycle = <T>(sideEffect: (self: T) => IDisposer) => (self: T) => {
    let disposer: IDisposer
    return {
        afterCreate() {
            disposer = sideEffect(self)
        },
        beforeDestroy() {
            disposer?.()
        }
    }

}

const RootState = types.model("RootStateModel", {
    playerMoves: types.optional(types.frozen<PlayerMove[]>(), []),
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
            self.playerMoves = [...self.playerMoves, currentPlayerMove]
        }
    }))

    .actions(genericLifecycle(
        (self) => {
            self.playerMoves = getLocalStorage("savedMoves") ?? []
            return reaction(
                () => self.playerMoves,
                (playerMoves) => setLocalStorage("savedMoves", playerMoves))
        }

    ))

    .actions(genericLifecycle(
        (self) => autorun(
            () => setFaviconWithChar(self.isXTurn ? "❌" : "⭕"),
        )))

export interface RootStateInstance extends Instance<typeof RootState> { }

export const rootState = RootState.create()

export const RootStateContext = createContext<RootStateInstance | null>(null)

export function useRootStateContext() {
    const contextValue = useContext(RootStateContext)
    if (isNil(contextValue)) throw new Error("RootStateContext not initialized")
    return contextValue
}
