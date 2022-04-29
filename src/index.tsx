import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ReactModal from "react-modal";

const ROOT_ID = "root";

const container = document.getElementById(ROOT_ID);
const root = createRoot(container!);
ReactModal.setAppElement(`#${ROOT_ID}`);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
