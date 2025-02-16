import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

//Assets imported by webpack
import cube from '../assets/models/cube.obj';
import images from '../assets/img/icon.jpg';

const root = createRoot(document.getElementById("root"));
root.render(<App />);
