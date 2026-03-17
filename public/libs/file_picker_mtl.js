import { info, verbose, warn, error } from "./debug_config.js";

/**
 * Validates that the given file is a Blender OBJ file.
 * Only checks extension at this time.
 * Returns a Promise resolving to { valid: boolean, error?: string }
 */
async function validate_mtl(file) {
    //TMP debug. Allow large files
    //if (file.size > 1000485760) {
    // Reject any files that are too big. 1048576 is 10MB in Bytes.
    if (file.size > 10485760) {
        error("Validation failed file is too large. Size is " + file.size)
        return { valid: false, error: 'File is too large. Maximum vald size is 10MB.' };
    }

    // Check extension
    if (!file.name.toLowerCase().endsWith('.mtl')) {
        return { valid: false, error: 'File must have a .mtl extension.' };
    }

    return { valid: true };
}

//export public facing functions
export { validate_mtl }