import { useEffect, useState } from "react";
import ModelForm from "./ModelForm.js";
import * as webgl from "../libs/webgl.js";

const Canvas = () => {
    useEffect(() => {
        const initGl = async () => { 
            const url_params = new URLSearchParams(window.location.search);
            var shaders = await webgl.get_shader_names();
            var resources = new Map();
            resources.set("vert_shader", await webgl.fetch_vert_shader(shaders.get("vert_shader")));
            resources.set("frag_shader", await webgl.fetch_frag_shader(shaders.get("frag_shader")));
            if(url_params.get("model") == undefined) {
                resources.set("cube", await webgl.fetch_model("cube.obj"));
            } else {
                resources.set("cube", await webgl.fetch_model(url_params.get("model")));
            }
            if(url_params.get("texture") != undefined) {
                resources.set("texture", await webgl.fetch_texture(url_params.get("texture")));
            } 
            webgl.init(resources);
        }
        
        initGl()
    }, []);

    const [fps, setFPS] = useState('asd');

    function set_fps(fps)
    {
        setFPS(fps.toFixed(0));
    }
    // Expose the function globally (for global access from rust)
    globalThis.set_fps = (fps) => set_fps(fps);

    return (
        <div>
            <h1>Web Assembly Model Viewer</h1>
            <ModelForm />
            <canvas id="glCanvas" className="border" width="736" height="480"></canvas>
            <div className="row">
                <div id="fps" className="w-25">
                    { fps }
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
