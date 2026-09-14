import { useContext, useEffect, useState } from "react";

import { ModelFormContext } from '../contexts/ModelFormContext.js';
import * as webgl from "../libs/webgl.mjs";
import { logger } from "../libs/debug_config.mjs";
import { compute_obj_stats } from "../libs/model_stats.mjs";

const ModelFormRow = () => {
    const { model_name, update_model_name, update_materials, update_model_stats } = useContext(ModelFormContext);

    //Form Items
    const [models, set_models] = useState([{model_id: 1, name: "cube-unlit.obj", display_name: "Cube"}]);

    const handle_model_change = (async (e) => {
        const new_model = e.target.value;
        update_model_name(new_model);
        try {
            const model_text = await webgl.fetch_model(new_model);
            // Live auto-load on dropdown change is disabled — selecting a
            // model now only updates the form/sidebar preview. The viewer
            // itself only switches model via the toolbar Refresh button
            // (see ModelForm.js's handle_refresh), matching the old
            // live-site's submit-to-load behaviour. Re-enable by
            // uncommenting the line below.
            // webgl.change_model(model_text);
            update_model_stats(compute_obj_stats(model_text));
        } catch (err) {
            logger["warn_js_wasm"](err.message);
        }

        // get_material_names() only reads the model from the URL query
        // string, which doesn't change on a dropdown swap, so fetch this
        // model's real materials directly from the same API it uses.
        try {
            const response = await fetch('/api/model/model_materials?model_name=' + encodeURIComponent(new_model));
            if (response.ok) {
                const data = await response.json();
                const material_names = (data.message || []).map((material_info) => material_info.material_name);
                update_materials(material_names);
            }
        } catch (err) {
            logger["warn_js_wasm"](err.message);
        }
    });
    //Get initial values for Form
    useEffect
    (
        () => {
            fetch("/api/model/models")
                .then(response => response.json())
                .then(data => {
                    set_models(data.message);
                })
                .catch(error => console.error("Error fetching data:", error))
            ;
        }, 
        []
    );

    return (
        <div id="modelRow" className="select-group">
            <label htmlFor="model">Model</label>
            <select id="model" name="model" value={model_name} onChange={handle_model_change}>
                {
                    models.map
                    (
                        (model) => 
                        (
                            <option key={model.model_id} value={model.name}>
                                {model.display_name}
                            </option>
                        )
                    )
                }
            </select>
        </div>
    )    
}

export default ModelFormRow;
