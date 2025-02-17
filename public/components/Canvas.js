import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import * as webgl from "../libs/webgl.js";

const Canvas = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    
    // Convert to a Map
    const paramMap = new Map();
    for (const [key, value] of params.entries()) {
        paramMap.set(key, value);
    }

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
        <div>
            <canvas id="glCanvas" className="border" width="640" height="480"></canvas>
        </div>
    );
};

export default Canvas;
