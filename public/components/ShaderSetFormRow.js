import { useContext, useEffect, useState } from "react";

import { ModelFormContext } from '../contexts/ModelFormContext.js';

const ShaderSetFormRow = () => {
    const { model_name } = useContext(ModelFormContext);

    const [shader_sets, set_shader_sets] = useState([{shader_set_id: 1, name: "vert-color", display_name: "Colored Vertices"}]); 

    //Get initial values for form
    useEffect
    (
        () => {
            fetch("/api/model/model_shader_sets?model_name=" + model_name)
                .then(response => response.json())
                .then(data => {
                    set_shader_sets(data.message);
                })
                .catch(error => console.error("Error fetching data:", error))
            ;
        }, 
        []
    );

    //Handle change in the model name
    useEffect
    (
        () => {
            fetch("/api/model/model_shader_sets?model_name=" + model_name)
                .then(response => response.json())
                .then(data => {
                    set_shader_sets(data.message);
                })
                .catch(error => console.error("Error fetching data:", error))
            ;
        },
        [model_name]
    )

    return (
        <div id="shaderRow" className="ms-auto text-start py-1 row">
            <div id="shaderLabel" className="col-1"> 
                <label htmlFor="shader">Shader: </label>
            </div>
            <div id="shaderElement" className="col-1">
                <select id="shader_set" name="shader_set">
                    {
                        shader_sets.map
                        (
                            (shader_set) => 
                            (
                                <option key={shader_set.shader_set_id} value={shader_set.name}>
                                    {shader_set.display_name}
                                </option>
                            )
                        )
                    }
                </select>
            </div>
        </div>
    )
}

export default ShaderSetFormRow;