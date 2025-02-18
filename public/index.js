import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.js";

//Assets imported by webpack
import '../assets/models/cube.obj';
import '../assets/models/teapot.obj';
import '../assets/img/icon.jpg';
import '../assets/img/favicons/favicon.ico';
import '../assets/shaders/vert-color.vert';
import '../assets/shaders/vert-color.frag';
import '../assets/shaders/vert-color-mouse.vert';
import '../assets/shaders/vert-color-mouse.frag';
import '../assets/shaders/vert-color-time.vert';
import '../assets/shaders/vert-color-time.frag';
import "./css/cover.css";

//React initialization
const root = createRoot(document.getElementById("root"));
root.render(<App />);