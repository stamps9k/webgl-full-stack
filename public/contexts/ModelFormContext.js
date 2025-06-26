import { useState, createContext } from "react";
import { useLocation } from "react-router-dom";

export const ModelFormContext = createContext();

export const ModelFormContextProvider = ((props) => {
    //Initialise variables and setters
    const [model_name, set_model_name] = useState("cube.obj");
    const [shader_sets, set_shader_sets] = useState([{shader_set_id: 1, name: "vert-color", display_name: "Colored Vertices"}]);
    const [textures, set_textures] = useState([{texture_id: 1, name: "", display_name: "Element Uninitialised"}]);

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

    const update_model_name = (new_model) => {
        set_model_name(new_model);
    };

    const update_shader_sets = (new_sets) => {
        set_shader_sets(new_set);
    };

    const update_textures = (new_textures) => {
        set_textures(new_texurtes);
    };

    return (
        <ModelFormContext.Provider value=
            {{ 
                "model_name": model_name, "update_model_name": update_model_name,
                "shader_sets": shader_sets, "update_shers_sets": update_shader_sets,
                "textures": textures, "update_textures": update_textures,
            }}
        >
            { props.children }  
        </ModelFormContext.Provider>
    )
});