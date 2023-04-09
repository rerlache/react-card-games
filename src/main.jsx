import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import BlackJack from "./features/blackJack/components/blackJack";
import Navigation from "./components/Navigation";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navigation />
    <hr />
  </React.StrictMode>
);
