export type Player = "X" | "O"

export interface PlayerMove {
    pos: number,
    player: Player
}