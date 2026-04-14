import { useContext, useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';

import { ModelFormContext } from '../contexts/ModelFormContext.js';

const RenderOptions = () => {
    return (
        <div id="renderRow" className="ms-auto text-start row-fluid px-2 py-1">
            <div id="headingRow" className="ms-auto text-start row">
                <h3 htmlFor="model" className="text-decoration-underline">Render Options</h3>
            </div>
            <span className="p-2">
                <label htmlFor="rotation_z"> WebGL:&nbsp;</label>
                <input type="radio" id="webgl_engine" name="engine" value="webgl_engine" checked readOnly/>
            </span>
            |
            <span className="p-2">
                <label htmlFor="rotation_z"> WebGPU:&nbsp;</label>
                <input type="radio" id="webgpu_engine" name="engine" value="webgpu_engine" disabled readOnly/>
            </span>
            <ToastContainer />
        </div>
    )    
}

export default RenderOptions;