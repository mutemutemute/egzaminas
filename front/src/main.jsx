import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContextProvider from "./contexts/UserContextProvider.jsx";
import AdContextProvider from "./contexts/AdContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <AdContextProvider>
        <App />
      </AdContextProvider>
    </UserContextProvider>
  </StrictMode>
);
