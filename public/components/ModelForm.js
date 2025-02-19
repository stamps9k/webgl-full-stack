import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse } from "bootstrap";

const ModelForm = () => {
    const [toggle, setToggle] = useState(false);
    const [models, set_models] = useState([{model_id: 1, name: "cube.obj", display_name: "Cube"}]);
    const [shaders, set_shaders] = useState([{shader_set_id: 1, name: "vert-color", display_name: "Colored Vertices"}]);

    const { search } = useLocation();
    const params = new URLSearchParams(search);
        
    // Convert to a Map
    const paramMap = new Map();
    for (const [key, value] of params.entries()) {
        paramMap.set(key, value);
    }


    //Add default model if not set
    if (paramMap.get("model") == undefined)
    {
        paramMap.set("model", "cube.obj");
    }
    if (paramMap.get("shader") == undefined)
    {
        paramMap.set("shader", "vert-color");
    }

    useEffect(() => {
        fetch("/api/model/models")
            .then(response => response.json())
            .then(data => {
                set_models(data.message);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        fetch("/api/model/model_shader_sets?model_name=" + paramMap.get("model"))
            .then(response => response.json())
            .then(data => {
                console.log(data);
                set_shaders(data.message);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        var myCollapse = document.getElementById('collapseOne')
        var bsCollapse = new Collapse(myCollapse, {toggle: false})
        toggle ? bsCollapse.show() : bsCollapse.hide()
    })

    return (
        <div>
            <div className="card-header py-3" id="collapseHeading">
                <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Choose Model
                </a>
            </div>
            <div id="collapseOne" className="collapse py-3" >
                <div className="border border-light card-body py-1">
                    <form id="model" target="_self" method="get" action="/index.html">
                        <div id="headingRow" className="ms-auto text-start row">
                        <h3 htmlFor="model" className="text-decoration-underline">Model Selection</h3>
                        </div>
                        <div id="modelRow" className="ms-auto text-start row">
                        <div id="modelLabel" className="col-1">
                            <label htmlFor="model">Model: </label>
                        </div>
                        <div id="modelElement" className="col-1">
                        <select id="model" name="model">
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
                        <div id="shaderRow" className="ms-auto text-start py-1 row">
                        <div id="shaderLabel" className="col-1"> 
                        <label htmlFor="shader">Shader: </label>
                        </div>
                        <div id="shaderElement" className="col-1">
                        <select id="shader" name="shader">
                            {
                                shaders.map
                                (
                                    (shader) => 
                                    (
                                        <option key={shader.shader_id} value={shader.name}>
                                            {shader.display_name}
                                        </option>
                                    )
                                )
                            }
                        </select>
                        </div>
                        </div>
                        <div id="submitRow" className="ms-auto py-1 row">
                        <div className="col-1 mx-1">
                        <button className="btn btn-success">Submit</button>
                        </div>
                        </div>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default ModelForm;