import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.js";

//Assets imported by webpack
import '../assets/models/cube.obj';
import '../assets/models/teapot.obj';
import '../assets/img/icon.jpg';
import '../assets/img/favicons/favicon.ico';
import '../assets/shaders/cube.vert';
import '../assets/shaders/cube.frag';
import "./css/cover.css";

//React initialization
const root = createRoot(document.getElementById("root"));
root.render(<App />);