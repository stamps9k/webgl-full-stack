import { useState, createContext } from "react";
import { useLocation } from "react-router-dom";

export const ModelFormContext = createContext();

export const ModelFormContextProvider = ((props) => {
    //Initialise variables and setters
    // Seeded from the URL's ?model= param (set by ModelForm's refresh
    // button) so the select reflects what Canvas.js actually loads on
    // this page load, rather than always starting back at the default.
    const [model_name, set_model_name] = useState(() => {
        const initial_params = new URLSearchParams(window.location.search);
        return initial_params.get("model") || "cube-unlit.obj";
    });
    const [shader_sets, set_shader_sets] = useState([{shader_set_id: 1, name: "vert-color", display_name: "Colored Vertices"}]);
    const [textures, set_textures] = useState([{texture_id: 1, name: "", display_name: "Element Uninitialised"}]);
    const [materials, set_materials] = useState([]);
    const [model_stats, set_model_stats] = useState({ vertices: null, faces: null, size_bytes: null });

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
        paramMap.set("model", "cube-unlit.obj");
    }
    if (paramMap.get("shader_set") == undefined)
    {
        paramMap.set("shader_set", "vert-color");
    }

    const update_model_name = (new_model) => {
        set_model_name(new_model);
    };

    const update_shader_sets = (new_sets) => {
        set_shader_sets(new_sets);
    };

    const update_textures = (new_textures) => {
        set_textures(new_textures);
    };

    const update_materials = (new_materials) => {
        set_materials(new_materials);
    };

    const update_model_stats = (new_stats) => {
        set_model_stats(new_stats);
    };

    return (
        <ModelFormContext.Provider value=
            {{ 
                "model_name": model_name, "update_model_name": update_model_name,
                "shader_sets": shader_sets, "update_shader_sets": update_shader_sets,
                "textures": textures, "update_textures": update_textures,
                "materials": materials, "update_materials": update_materials,
                "model_stats": model_stats, "update_model_stats": update_model_stats,
            }}
        >
            { props.children }  
        </ModelFormContext.Provider>
    )
});
