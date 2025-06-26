import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ModelFormContext } from '../contexts/ModelFormContext.js';

const ModelFormRow = () => {
    const { model_name, update_model_name } = useContext(ModelFormContext);

    //Form Items
    const [models, set_models] = useState([{model_id: 1, name: "cube.obj", display_name: "Cube"}]);

    const handle_model_change = ((e) => {
        update_model_name(e.target.value);
        /*fetch("/api/model/model_shader_sets?model_name=" + e.target.value)
            .then(response => response.json())
            .then(data => {
                update_shader_sets(data.message);
            })
            .catch(error => console.error("Error fetching data:", error))
        ;
        fetch("/api/model/model_textures?model_name=" + e.target.value)
            .then(response => response.json())
            .then(data => {
                update_textures(data.message);
            })
            .catch(error => console.error("Error fetching data:", error))
        ;*/
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
        <div id="modelRow" className="ms-auto text-start row">
            <div id="modelLabel" className="col-1">
                <label htmlFor="model">Model: </label>
            </div>
            <div id="modelElement" className="col-1">
                <select id="model" name="model" onChange={handle_model_change}>
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
        </div>
    )    
}

export default ModelFormRow;