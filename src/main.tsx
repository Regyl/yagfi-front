import React from "react";
import ReactDOM from "react-dom/client";
import i18n from "./i18n";
import App from "./app/App";
import "./index.css";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
