import { useContext, useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';

import { ModelFormContext } from '../contexts/ModelFormContext.js';

import * as fp_obj from "../libs/file_picker_obj.js";
import * as fp_opfs from "../libs/file_picker_opfs.js";
import * as fp_mat from "../libs/file_picker_mtl.js";
import * as fp_tex from "../libs/file_picker_tex.js";

const ModelFormRow = () => {
    const { model_name, update_model_name } = useContext(ModelFormContext);

    //Form Items
    const [models, set_models] = useState([{model_id: 1, name: "cube.obj", display_name: "Cube"}]);
    const inputRef = useRef(null);

    useEffect(
        () => 
        {
            if (inputRef.current) 
            {
                inputRef.current.setAttribute("webkitdirectory", "");
            }
        }, 
        []
    );

    const handle_file_picked = (async (e) => {
        var input = e.target

        //Check that I file was passed.
        if (input.files.length === 0) {
            alert('No file selected');
            return;
        }

        // Filter any hidden .files from processing.
        const files = Array.from(e.target.files).filter(
            file => !/(^|\/)\./.test(file.name)
        );

        // Validate file contents and stop on any remaining unknown file types.
        for (const file of files)
        {
            var validation_result = { valid: true, error: '' };
            if (file.name.includes('obj'))
            {
                validation_result = await fp_obj.validate_obj(file);
            } 
            else if 
            (
                file.name.includes('tex') ||
                file.name.includes('png')
            )
            {
                validation_result = await fp_tex.validate_tex(file);
            } 
            else if (file.name.includes('mtl')) 
            {
                validation_result = await fp_mat.validate_mtl(file);
            }
            else
            {
                validation_result = { valid: false, error: 'Unknown file type .' + file.name.split('.').pop() }
                break;
            }
        }

        // Return any validation errors to the user
        if (validation_result.valid === false) {
            toast.error
            (
                <span>
                    Upload failed:
                    <br /> 
                    {validation_result.error}
                </span>
            );
            return;
        }
        
        //Read full files into memory and change the live model
        await fp_opfs.save_file(files)
        await fp_opfs.process_file(files);
    });

    return (
        <div id="fileRow" className="ms-auto text-start row-fluid px-2 py-1">
            <label htmlFor="formFile" className="form-label">Default file input example</label>
            <input type="file" id="folder-input" className="form-control" ref={inputRef} multiple onChange={handle_file_picked} />
            <ToastContainer />
        </div>
    )    
}

export default ModelFormRow;