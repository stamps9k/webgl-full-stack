import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./cover.css";
import * as webgl from "./webgl.js";


const App = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/model/model_shaders")
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        webgl.fetch_vert_shader();
    }, []);

    return (
        <canvas id="glCanvas" className="border" width="640" height="480"></canvas>
    );
};

export default App;
