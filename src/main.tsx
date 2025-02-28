import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
/* import { GameContextProvider } from "./GameContext.tsx" */
import { rootState, RootStateContext } from "./state/index.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootStateContext.Provider value={rootState}>
      {/* <GameContextProvider> */}
      <App />
      {/* </GameContextProvider> */}
    </RootStateContext.Provider>
  </StrictMode>
)
