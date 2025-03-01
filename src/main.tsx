import App from "./app";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
