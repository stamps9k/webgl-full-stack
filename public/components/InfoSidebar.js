import { useContext } from "react";

import { ModelFormContext } from "../contexts/ModelFormContext.js";
import { format_bytes } from "../libs/model_stats.mjs";

// Model Info / Materials / Lighting panels.
// - Model Info + Materials show real data: vertex/face count and file size
//   are computed client-side from the .obj text the viewer already fetched
//   (see libs/model_stats.mjs), and the material list comes from the same
//   /api/model/model_materials endpoint the app already uses elsewhere.
// - Lighting has no toggle capability in the WASM renderer, so this panel
//   is status text, not controls: Directional is the one lighting mode the
//   engine actually implements; Ambient/Specular are roadmap items, shown
//   the same way the "Wireframe · soon" tool chip flags unfinished work.
const InfoSidebar = () => {
    const { materials, model_stats } = useContext(ModelFormContext);

    return (
        <div className="info-sidebar">
            <div className="info-card">
                <h3>MODEL INFO</h3>
                <div className="info-row">
                    <span className="label">Format</span>
                    <span className="value">OBJ / MTL</span>
                </div>
                <div className="info-row">
                    <span className="label">Vertices</span>
                    <span className="value">{model_stats.vertices != null ? model_stats.vertices.toLocaleString() : "—"}</span>
                </div>
                <div className="info-row">
                    <span className="label">Faces</span>
                    <span className="value">{model_stats.faces != null ? model_stats.faces.toLocaleString() : "—"}</span>
                </div>
                <div className="info-row">
                    <span className="label">Materials</span>
                    <span className="value">{materials.length}</span>
                </div>
                <div className="info-row">
                    <span className="label">File size</span>
                    <span className="value">{format_bytes(model_stats.size_bytes)}</span>
                </div>
            </div>

            <div className="info-card">
                <h3>MATERIALS</h3>
                {
                    materials.length === 0
                        ? <div className="info-row"><span className="label">None reported</span></div>
                        : materials.map((material_name) => (
                            <div className="material-row" key={material_name}>
                                <span className="material-dot"></span>
                                {material_name}
                            </div>
                        ))
                }
            </div>

            <div className="info-card">
                <h3>LIGHTING</h3>
                <div className="light-row">
                    <span>Directional</span>
                    <span className="pill on">ON</span>
                </div>
                <div className="light-row">
                    <span>Ambient</span>
                    <span className="pill off">PLANNED</span>
                </div>
                <div className="light-row">
                    <span>Specular</span>
                    <span className="pill off">PLANNED</span>
                </div>
            </div>
        </div>
    );
};

export default InfoSidebar;
