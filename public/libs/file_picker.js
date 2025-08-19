import { info, verbose, warn, error } from "./debug_config.js";

/**
 * Validates that the given file is a Blender OBJ file.
 * Checks extension, reads text, looks for OBJ keywords and Blender comment.
 * Returns a Promise resolving to { valid: boolean, error?: string }
 */
async function validate_file(file) {
    // Check extension
    if (!file.name.toLowerCase().endsWith('.obj')) {
        return { valid: false, error: 'File must have a .obj extension.' };
    }

    // Read first 64KB (should be enough for validation)
    const maxBytes = 65536;
    const blob = file.slice(0, maxBytes);
    let text = '';
    try {
        text = await blob.text();
    } catch (e) {
        return { valid: false, error: 'Could not read file as text.' };
    }

    // Check file is not empty or too small
    if (text.trim().length < 20) {
        return { valid: false, error: 'File is too small to be a valid OBJ file.' };
    }

    // Check for OBJ keywords and Blender comment
    const hasVertex = /^v\s+/m.test(text);
    const hasFace = /^f\s+/m.test(text);
    const hasBlender = /^# Blender/m.test(text);
    const hasObjHeader = /^#\s*Wavefront OBJ/m.test(text);
    const hasAnyObjKeyword = hasVertex || hasFace || /^vt\s+/m.test(text) || /^vn\s+/m.test(text);

    if (!hasAnyObjKeyword) {
        return { valid: false, error: 'File does not appear to be a valid OBJ file (missing OBJ keywords).' };
    }

    // Optionally require Blender comment, but allow generic OBJ
    if (!(hasBlender || hasObjHeader)) {
        warn('OBJ file does not have a Blender or Wavefront header comment.');
    }

    return { valid: true };
}

async function save_file(file) {
    const opfsRoot = await navigator.storage.getDirectory(); // OPFS root

    // Create a new file in OPFS with the same name
    const opfsHandle = await opfsRoot.getFileHandle(file.name, { create: true });
    const writable = await opfsHandle.createWritable();

    // Copy contents from uploaded file to OPFS
    await writable.write(await file.arrayBuffer());
    await writable.close();

    info(`Saved ${file.name} to OPFS!`);
}

function process_file(file) {
    warn("TODO add file processing logic");
}

//export public facing functions
export { validate_file, save_file ,process_file }