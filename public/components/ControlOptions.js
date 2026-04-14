import { useContext, useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';

import { ModelFormContext } from '../contexts/ModelFormContext.js';

import * as fp_obj from "../libs/file_picker_obj.mjs";
import * as fp_opfs from "../libs/file_picker_opfs.mjs";
import * as fp_mat from "../libs/file_picker_mtl.mjs";
import * as fp_tex from "../libs/file_picker_tex.mjs";

const ControlOptions = () => {
    return (
        <div id="renderRow" className="ms-auto text-start row-fluid px-2 py-1">
            <div id="headingRow" className="ms-auto text-start row">
                <h3 htmlFor="model" className="text-decoration-underline">Control Options</h3>
            </div>
            <span className="p-2">
                <label htmlFor="rotation_z"> FPS:&nbsp;</label>
                <input type="radio" id="fps" name="control_scheme" value="fps" checked readOnly />
            </span>
            |
            <span className="p-2">
                <label htmlFor="rotation_z"> Blender:&nbsp;</label>
                <input type="radio" id="blender" name="control_scheme" value="blender" disabled readOnly />
            </span>
            <ToastContainer />
        </div>
    )    
}

export default ControlOptions;