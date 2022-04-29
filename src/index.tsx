import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import ReactModal from "react-modal";

/*const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/

ReactModal.setAppElement("#root");

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);