import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import "./ai.css";
import "./studio.css";
import "./themes.css";
import "./modern.css";
import "./design.css";
import "./light.css";
import "./layout-extra.css";
import "./sixties.css";
import "./groovy.css";
import "./psych.css";

document.documentElement.classList.add("js");
createRoot(document.getElementById("root")).render(<App />);
