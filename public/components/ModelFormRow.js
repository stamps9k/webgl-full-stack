import { useContext, useEffect, useState } from "react";

import { ModelFormContext } from '../contexts/ModelFormContext.js';

const ModelFormRow = () => {
    const { model_name, update_model_name } = useContext(ModelFormContext);

    //Form Items
    const [models, set_models] = useState([{model_id: 1, name: "cube-unlit.obj", display_name: "Cube"}]);

    const handle_model_change = ((e) => {
        update_model_name(e.target.value);
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