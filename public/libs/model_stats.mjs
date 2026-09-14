// Small helper for the Model Info panel — derives real numbers from the
// .obj text already fetched for rendering, rather than inventing any.
// (There's no vertex/face-count or file-size API; this is genuinely
// computed from the file the viewer just loaded.)

function compute_obj_stats(obj_text) {
    let vertices = 0;
    let faces = 0;

    const lines = obj_text.split("\n");
    for (const raw_line of lines) {
        const line = raw_line.trim();
        if (line.startsWith("v ")) {
            vertices++;
        } else if (line.startsWith("f ")) {
            faces++;
        }
    }

    const size_bytes = new Blob([obj_text]).size;

    return { vertices, faces, size_bytes };
}

function format_bytes(size_bytes) {
    if (size_bytes == null) {
        return "—";
    }
    if (size_bytes < 1024) {
        return size_bytes + " B";
    }
    if (size_bytes < 1024 * 1024) {
        return (size_bytes / 1024).toFixed(1) + " KB";
    }
    return (size_bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export { compute_obj_stats, format_bytes };
