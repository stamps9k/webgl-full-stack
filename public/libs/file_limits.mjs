// Maximum accepted size for each kind of uploaded file, in bytes.
// Uploads never leave the browser (they are stored in OPFS), so these limits
// protect the tab: each file is read fully into memory when saved, and
// textures are decoded and sent to the GPU.
const MB = 1024 * 1024;

const MAX_OBJ_BYTES = 100 * MB;
const MAX_MTL_BYTES = 10 * MB;
const MAX_TEX_BYTES = 100 * MB;

function format_limit(bytes) {
    return (bytes / MB) + 'MB';
}

export { MAX_OBJ_BYTES, MAX_MTL_BYTES, MAX_TEX_BYTES, format_limit }
