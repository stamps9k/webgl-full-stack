import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse } from "bootstrap";

const ModelForm = () => {
    const [toggle, setToggle] = useState(false);
    const [models, set_models] = useState([{model_id: 1, name: "asd", display_name: "asdsa"}]);

    const { search } = useLocation();
    const params = new URLSearchParams(search);
        
    // Convert to a Map
    const paramMap = new Map();
    for (const [key, value] of params.entries()) {
        paramMap.set(key, value);
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
                <div className="card-body">
                    <form id="model" target="_self" method="get" action="/index.html">
                        <label htmlFor="model">Model: </label>
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
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModelForm;