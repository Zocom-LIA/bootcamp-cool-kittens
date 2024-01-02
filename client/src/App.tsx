import { AppRoutes } from "@zocom/router";
import { AppProvider } from "@zocom/app-context";

export function App() {

  return (
    <AppProvider> 
      <div className="App">
        <AppRoutes />
      </div>
    </AppProvider>
  )
}
