import { AppRoutes } from "@zocom/router";
import AppProvider from "../packages/core/context/AppProvider"

export function App() {

  return (
    <AppProvider> 
      <div className="App">
        <AppRoutes />
      </div>
    </AppProvider>
  )
}
