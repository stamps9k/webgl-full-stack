import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse } from "bootstrap";

const Canvas = () => {
    var [toggle, setToggle] = useState(false);

    const { search } = useLocation();
    const params = new URLSearchParams(search);
        
    // Convert to a Map
    const paramMap = new Map();
    for (const [key, value] of params.entries()) {
        paramMap.set(key, value);
    }

    /*
        useEffect(() => {
            fetch("/api/model/model_shaders")
                .then(response => response.json())
                .then(data => setMessage(data.message))
                .catch(error => console.error("Error fetching data:", error));
        }, []);
    */

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
                            <option value="cube">cube</option>
                            <option value="cube-time">cube-time</option>
                            <option value="cube-mouse">cube-mouse</option>
                            <option value="teapot">teapot</option>
                            <option value="cube-tex">textured cube</option>
                        </select>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Canvas;