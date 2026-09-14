import { useContext, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import ModelForm from "./ModelForm.js";
import InfoSidebar from "./InfoSidebar.js";
import { ModelFormContext } from "../contexts/ModelFormContext.js";
import { compute_obj_stats } from "../libs/model_stats.mjs";
import * as webgl from "../libs/webgl.mjs";
import { logger } from "../libs/debug_config.mjs"

const Canvas = () => {
    const canvasRef = useRef(null);
    const { update_materials, update_model_stats } = useContext(ModelFormContext);

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
                var model_text;
                if(url_params.get("model") == undefined) {
                    model_text = await webgl.fetch_model("cube-unlit.obj");
                } else {
                    model_text = await webgl.fetch_model(url_params.get("model"));
                }
                resources.set("cube", model_text);
                resources.set("materials", await webgl.fetch_materials(materials));
                resources.set("textures", await webgl.fetch_textures(textures))
                webgl.init(resources);
                update_materials(materials);
                update_model_stats(compute_obj_stats(model_text));
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

    const handle_fullscreen = () => {
        if (canvasRef.current) {
            canvasRef.current.requestFullscreen?.();
        }
    };

    return (
        <div className="stage-row">
        <div className="viewport-card">
            <ModelForm onFullscreen={handle_fullscreen} />
            <div className="canvas-stage">
                <canvas id="glCanvas" ref={canvasRef} className="border" width="736" height="480"></canvas>
            </div>
            <div className="camera-controls">
                <div id="fps">{ fps }</div>
                <div className="controls-sep"></div>
                <span className="toggle-chip">
                    <label htmlFor="zoom_in">Zoom In</label>
                    <input type="checkbox" id="zoom_in" name="zoom_in" value="zoom_in" onChange={webgl.update_zoom_in} />
                </span>
                <span className="toggle-chip">
                    <label htmlFor="zoom_out">Zoom Out</label>
                    <input type="checkbox" id="zoom_out" name="zoom_out" value="zoom_out" onChange={webgl.update_zoom_out} />
                </span>
                <span className="toggle-chip">
                    <label htmlFor="rotation_x">Rotate X</label>
                    <input type="checkbox" id="rotation_x" name="rotation_x" value="rotation_x" onChange={webgl.update_rotate_x} />
                </span>
                <span className="toggle-chip">
                    <label htmlFor="rotation_y">Rotate Y</label>
                    <input type="checkbox" id="rotation_y" name="rotation_y" value="rotation_y" onChange={webgl.update_rotate_y} />
                </span>
                <span className="toggle-chip">
                    <label htmlFor="rotation_z">Rotate Z</label>
                    <input type="checkbox" id="rotation_z" name="rotation_z" value="rotation_z" onChange={webgl.update_rotate_z} />
                </span>
                <div className="tool-btns">
                    <button type="button" className="tool-chip soon" disabled title="Wireframe view — not implemented yet">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 3v18M4 7.5l8 4.5 8-4.5"/></svg>
                        Wireframe · soon
                    </button>
                    <button type="button" className="tool-chip" onClick={handle_fullscreen} title="Fullscreen">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 3H4v4M16 3h4v4M8 21H4v-4M16 21h4v-4"/></svg>
                        Fullscreen
                    </button>
                </div>
            </div>
        </div>
        <InfoSidebar />
        </div>
    );
};

export default Canvas;
