import { useContext } from "react";

import ModelFilePicker from "./ModelFilePicker.js";
import ModelFormRow from "./ModelFormRow.js";
import ShaderSetFormRow from "./ShaderSetFormRow.js";
import { ModelFormContext } from '../contexts/ModelFormContext.js';
// Render Options / Control Options are temporarily off the rendered page
// (not deleted — see RenderOptions.js / ControlOptions.js). Re-enable by
// restoring these imports and the accordion block below.
// import RenderOptions from "./RenderOptions.js";
// import ControlOptions from "./ControlOptions.js";

const ModelForm = ({ onFullscreen }) => {
    const { model_name } = useContext(ModelFormContext);

    // Same behaviour as the old live-site "Submit" form: reload the page
    // with the chosen model + shader set as query params, which is what
    // Canvas.js's initGl already reads on load. The shader select is still
    // uncontrolled (see ShaderSetFormRow.js's TODO), so its value is read
    // straight off the DOM here, same as the old native form submit did.
    const handle_refresh = () => {
        const shader_select = document.getElementById("shader_set");
        const params = new URLSearchParams();
        params.set("model", model_name);
        if (shader_select && shader_select.value) {
            params.set("shader_set", shader_select.value);
        }
        window.location.href = window.location.pathname + "?" + params.toString();
    };

    return (
        <>
            <div className="viewer-toolbar">
                <div className="select-row">
                    <ModelFormRow />
                    <ShaderSetFormRow />
                </div>
                <div className="toolbar-sep"></div>
                <div className="upload-trigger-wrap">
                    <button type="button" className="upload-trigger" data-bs-toggle="modal" data-bs-target="#uploadModal">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
                        Upload Model
                    </button>
                </div>
                {/* Refresh submits model + shader set like the old live-site
                    form did (see handle_refresh above). Fullscreen shares the
                    same handler as the button at the bottom of the viewer
                    (passed down from Canvas.js). Wireframe is still visual
                    only, not wired up yet. */}
                <div className="toolbar-icon-btns">
                    <button type="button" className="icon-btn" title="Refresh" onClick={handle_refresh}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12a9 9 0 1 1 2.6 6.3"/><path d="M3 4v6h6"/></svg>
                    </button>
                    <button type="button" className="icon-btn" title="Wireframe">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 3v18M4 7.5l8 4.5 8-4.5"/></svg>
                    </button>
                    <button type="button" className="icon-btn" title="Fullscreen" onClick={onFullscreen}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 3H4v4M16 3h4v4M8 21H4v-4M16 21h4v-4"/></svg>
                    </button>
                </div>
            </div>

            <div className="modal fade upload-modal" id="uploadModal" tabIndex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="uploadModalLabel">UPLOAD MODEL</h2>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ModelFilePicker />
                        </div>
                    </div>
                </div>
            </div>

            {/* Render Options / Control Options — temporarily disabled, not
                deleted. Uncomment this block (and the imports above) to
                bring them back. */}
            {/*
            <div id="accordion" className="mt-3">
                <div className="card-header py-3 row justify-content-center" id="collapseHeading">
                    <div className="col-6">
                        <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Render Options
                        </a>
                    </div>
                    <div className="col-6">
                        <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Control Options
                        </a>
                    </div>
                </div>
                <div id="collapseThree" className="collapse py-3" data-bs-parent="#accordion">
                    <div className="border border-light card-body py-1">
                        <RenderOptions />
                    </div>
                </div>
                <div id="collapseFour" className="collapse py-3" data-bs-parent="#accordion">
                    <div className="border border-light card-body py-1">
                        <ControlOptions />
                    </div>
                </div>
            </div>
            */}
        </>
    )
}

export default ModelForm;
