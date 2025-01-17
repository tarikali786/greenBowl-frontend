import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SaladProvider } from "./Component/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SaladProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SaladProvider>
  </StrictMode>
);
