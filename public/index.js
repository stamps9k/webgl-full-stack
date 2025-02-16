import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as webgl from "./webgl.js";

//Assets imported by webpack
import cube from '../assets/models/cube.obj';
import images from '../assets/img/icon.jpg';
import vert_shader from '../assets/shaders/cube.vert';
import frag_shader from '../assets/shaders/cube.frag';

//React initialization
const root = createRoot(document.getElementById("root"));
root.render(<App />);