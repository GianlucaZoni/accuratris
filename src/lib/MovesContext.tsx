import { createContext } from "react"
import { PlayerMove } from "./types"

export const MovesContext = createContext<PlayerMove[]>([])
