import React, { useEffect, useState, createContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse } from "bootstrap";

import ModelFormRow from "./ModelFormRow.js";
import TextureFormRow from "./TextureFormRow.js";
import ShaderSetFormRow from "./ShaderSetFormRow.js";
import { ModelFormContext, ModelFormContextProvider } from '../contexts/ModelFormContext.js';

const ModelForm = () => {
    const [toggle, setToggle] = useState(false);

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
    if (paramMap.get("shader_set") == undefined)
    {
        paramMap.set("shader_set", "vert-color");
    }

    //Activate collapse effect 
    useEffect(() => {
        var myCollapse = document.getElementById('collapseOne')
        var bsCollapse = new Collapse(myCollapse, {toggle: false})
        toggle ? bsCollapse.show() : bsCollapse.hide()
    }, []);

    return (
        <ModelFormContextProvider>
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
                        <ModelFormRow />
                        <ShaderSetFormRow />
                        <TextureFormRow />
                        <div id="submitRow" className="ms-auto py-1 row">
                        <div className="col-1 mx-1">
                        <button className="btn btn-success">Submit</button>
                        </div>
                        </div>
                        </form>
                </div>
            </div>
        </div>
        </ModelFormContextProvider>
    )
}

export default ModelForm;