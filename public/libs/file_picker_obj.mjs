import { logger } from "./debug_config.mjs";
import { change_model } from "./webgl.mjs";

/**
 * Validates that the given file is a Blender OBJ file.
 * Checks extension, reads text, looks for OBJ keywords and Blender comment.
 * Returns a Promise resolving to { valid: boolean, error?: string }
 */
async function validate_obj(file) {
    //TMP debug. Allow large files
    if (file.size > 1000485760) {
    // Reject any files that are too big. 1048576 is 10MB in Bytes.
    //if (file.size > 10485760) {
        logger["error_js_opfs"]("Validation failed file is too large. Size is " + file.size)
        return { valid: false, error: 'File is too large. Maximum vald size is 10MB.' };
    }

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
        logger["warn_js_opfs"]('OBJ file does not have a Blender or Wavefront header comment.');
    }

    return { valid: true };
}

//export public facing functions
export { validate_obj }