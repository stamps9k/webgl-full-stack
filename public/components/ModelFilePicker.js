import { useContext, useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';

import { ModelFormContext } from '../contexts/ModelFormContext.js';

import * as fp_opfs from "../libs/file_picker_opfs.mjs";
import * as fp_validate from "../libs/file_picker_validate.mjs";

const ModelFilePicker = () => {
    const { model_name, update_model_name } = useContext(ModelFormContext);

    //Form Items
    const [models, set_models] = useState([{model_id: 1, name: "cube.obj", display_name: "Cube"}]);
    const inputRef = useRef(null);

    // Files picked + validated, waiting on the Go button — nothing is
    // loaded into the viewer until the user confirms.
    const [pending_files, set_pending_files] = useState(null);
    const [selection_label, set_selection_label] = useState("");

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

        // Validate every file; the first invalid one rejects the selection.
        const validation_result = await fp_validate.validate_files(files);

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
            set_pending_files(null);
            set_selection_label("");
            return;
        }

        // Stage the validated selection — the model doesn't load and the
        // modal doesn't close until the user clicks Go.
        set_pending_files(files);
        set_selection_label(files.length + (files.length === 1 ? " file selected" : " files selected"));
    });

    const handle_go = (async () => {
        if (!pending_files || pending_files.length === 0) {
            return;
        }

        //Read full files into memory and change the live model
        await fp_opfs.save_file(pending_files)
        await fp_opfs.process_file(pending_files);

        set_pending_files(null);
        set_selection_label("");
        if (inputRef.current) {
            inputRef.current.value = "";
        }

        // Close the modal now that the model has actually been loaded.
        const modal_el = document.getElementById('uploadModal');
        const modal_instance = modal_el ? bootstrap.Modal.getInstance(modal_el) : null;
        modal_instance?.hide();
    });

    return (
        <div id="fileRow" className="dropzone">
            <label htmlFor="folder-input" className="form-label d-block mb-2">
                Drop a folder containing your .obj + .mtl (and textures), or browse
            </label>
            <input type="file" id="folder-input" className="form-control" ref={inputRef} multiple onChange={handle_file_picked} />
            <div className="sub-text">.obj + .mtl · textures optional</div>
            {
                selection_label &&
                <div className="upload-selection-label">{selection_label}</div>
            }
            <button type="button" className="btn upload-go-btn" disabled={!pending_files} onClick={handle_go}>
                Go
            </button>
            <ToastContainer />
        </div>
    )    
}

export default ModelFilePicker;
