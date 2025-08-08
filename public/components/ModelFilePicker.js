import { useContext, useEffect, useState } from "react";

import { ModelFormContext } from '../contexts/ModelFormContext.js';

import * as fp from "../libs/file_picker.js";

const ModelFormRow = () => {
    const { model_name, update_model_name } = useContext(ModelFormContext);

    //Form Items
    const [models, set_models] = useState([{model_id: 1, name: "cube.obj", display_name: "Cube"}]);

    const handle_file_picked = (async (e) => {
        var input = e.target
        if (input.files.length === 0) {
            alert('No file selected');
            return;
        }

        const file = input.files[0]; // The File object

        fp.validate_file(file);
        await fp.save_file(file)
        fp.process_file(file);
    });

    return (
        <div id="fileRow" className="ms-auto text-start row-fluid px-2 py-1">
            <label htmlFor="formFile" className="form-label">Default file input example</label>
            <input className="form-control" type="file" id="formFile" onChange={handle_file_picked} />
        </div>
    )    
}

export default ModelFormRow;