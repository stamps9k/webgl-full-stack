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
            <h1>Web Assembly Model Viewer</h1>
            <div class="card-header py-3" id="collapseHeading">
                <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Choose Model
                </a>
            </div>
            <div id="collapseOne" class="collapse py-3">
                <div class="card-body">
                    <form id="model" target="_self" method="get" action="/index.html">
                        <label for="model">Model: </label>
                        <select id="model" name="model">
                            <option value="cube">cube</option>
                            <option value="cube-time">cube-time</option>
                            <option value="cube-mouse">cube-mouse</option>
                            <option value="teapot">teapot</option>
                            <option value="cube-tex">textured cube</option>
                        </select>
                        <input type="submit" />
                    </form>
                </div>
            </div>
            <canvas id="glCanvas" class="border" width="640" height="480"></canvas>
            <div class="row">
                <div id="fps" class="w-25">
                    FPS - #N/A
                </div>
                <div class="w-75">
                    <label for="rotation_x"> Rotate X:</label>
                    <input type="checkbox" id="rotation_x" name="rotation_x" value="rotation_x" onchange="update_rotate_x(this)" />
                    <label for="rotation_y"> Rotate Y:</label>
                    <input type="checkbox" id="rotation_y" name="rotation_y" value="rotation_y" onchange="update_rotate_y(this)" />
                    <label for="rotation_z"> Rotate Z:</label>
                    <input type="checkbox" id="rotation_z" name="rotation_z" value="rotation_z" onchange="update_rotate_z(this)" />
                </div>
            </div>
        </div>
    );
};

export default Canvas;
