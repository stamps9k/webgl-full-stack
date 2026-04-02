import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import ModelForm from "./ModelForm.js";
import * as webgl from "../libs/webgl.mjs";
import { logger } from "../libs/debug_config.mjs"

const Canvas = () => {
    useEffect(() => {
        const initGl = async () => { 
            const url_params = new URLSearchParams(window.location.search);
            try {
                var shaders = await webgl.get_shader_names();
                var materials = await webgl.get_material_names();
                var textures = await webgl.get_texture_names(materials);
                var resources = new Map();
                resources.set("vert_shader", await webgl.fetch_vert_shader(shaders.get("vert_shader")));
                resources.set("frag_shader", await webgl.fetch_frag_shader(shaders.get("frag_shader")));
                if(url_params.get("model") == undefined) {
                    resources.set("cube", await webgl.fetch_model("cube.obj"));
                } else {
                    resources.set("cube", await webgl.fetch_model(url_params.get("model")));
                }
                resources.set("materials", await webgl.fetch_materials(materials));
                resources.set("textures", await webgl.fetch_textures(textures))
                webgl.init(resources);
            } catch (e)
            {
                logger["warn_js_wasm"](e.message);
                toast.error
                (
                    <span>
                        Error on start:
                        <br /> 
                        {e.message}
                    </span>
                );
                return;
            }
        }
        
        initGl()
    }, []);

    const [fps, setFPS] = useState('FPS - #N/A');

    function set_fps(fps)
    {
        setFPS("FPS - " + fps.toFixed(0));
    }
    // Expose the function globally (for global access from rust)
    globalThis.set_fps = (fps) => set_fps(fps);

    return (
        <div>
            <h1>Web Assembly Model Viewer</h1>
            <ModelForm />
            <canvas id="glCanvas" className="border" width="736" height="480"></canvas>
            <div className="row">
                <div id="fps" className="w-25 text-start">
                    { fps }
                </div>
                <div className="w-75">
                    <label htmlFor="zoom_in"> Zoom In:</label>
                    <input type="checkbox" id="zoom_in" name="zoom_in" value="zoom_in" onChange={webgl.update_zoom_in} />
                    <label htmlFor="zoom_out"> Zoom Out:</label>
                    <input type="checkbox" id="zoom_out" name="zoom_out" value="zoom_out" onChange={webgl.update_zoom_out} />
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
