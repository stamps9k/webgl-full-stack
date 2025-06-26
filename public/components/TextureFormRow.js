import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse } from "bootstrap";

import { ModelFormContext } from '../contexts/ModelFormContext.js';

const TextureFormRow = () => {
    const { model_name } = useContext(ModelFormContext);

    const [textures, set_textures] = useState([{texture_id: 1, name: "", display_name: "Element Uninitialised"}]);

    //Get initial values for Form
    useEffect
    (
        () => {
            fetch("/api/model/model_textures?model_name=" + model_name)
            .then(response => response.json())
            .then(data => {
                set_textures(data.message);
            })
            .catch(error => console.error("Error fetching data:", error))
            ;
        }, 
        []
    );

    //Handel change in model_name
    useEffect
    (
        () => {
            fetch("/api/model/model_textures?model_name=" + model_name)
            .then(response => response.json())
            .then(data => {
                set_textures(data.message);
            })
            .catch(error => console.error("Error fetching data:", error))
            ;
        }, 
        [model_name]
    );

    //Function for returning texture html. In seperate function so that if else logic can be applied in the future
    const set_textures_html = ((textures) => {
        return (
            <div id="textureRow" className="ms-auto text-start py-1 row">
                <div id="textureLabel" className="col-1"> 
                    <label htmlFor="texture">Texture: </label>
                </div>
                <div id="textureElement" className="col-1">
                    <select id="texture" name="texture">
                        {
                            textures.map
                            (
                                (texture) => 
                                (
                                    <option key={texture.texture_id} value={texture.name}>
                                        {texture.display_name}
                                    </option>
                                )
                            )
                        }
                    </select>
                </div>
            </div>
        )
    });

    return <div> { set_textures_html(textures) } </div>
}

export default TextureFormRow;