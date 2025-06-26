import { useEffect } from "react";
import ModelForm from "./ModelForm.js";
import * as webgl from "../libs/webgl.js";

const Canvas = () => {
    useEffect(() => {
        webgl.fetch_vert_shader();
    }, []);

    return (
        <div>
            <h1>Web Assembly Model Viewer</h1>
            <ModelForm />
            <canvas id="glCanvas" className="border" width="736" height="480"></canvas>
            <div className="row">
                <div id="fps" className="w-25">
                    FPS - #N/A
                </div>
                <div className="w-75">
                    <label htmlFor="rotation_x"> Rotate X:</label>
                    <input type="checkbox" id="rotation_x" name="rotation_x" value="rotation_x" onChange={webgl.update_rotate_x} />
                    <label htmlFor="rotation_y"> Rotate Y:</label>
                    <input type="checkbox" id="rotation_y" name="rotation_y" value="rotation_y" onChange={webgl.update_rotate_y} />
                    <label htmlFor="rotation_z"> Rotate Z:</label>
                    <input type="checkbox" id="rotation_z" name="rotation_z" value="rotation_z" onChange={webgl.update_rotate_z} />
                </div>
            </div>
        </div>
    );
};

export default Canvas;
