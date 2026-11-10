import { logger } from "./debug_config.mjs";
import { MAX_MTL_BYTES, format_limit } from "./file_limits.mjs";

/**
 * Validates that the given file is a Blender OBJ file.
 * Only checks extension at this time.
 * Returns a Promise resolving to { valid: boolean, error?: string }
 */
async function validate_mtl(file) {
  if (file.size > MAX_MTL_BYTES) {
    logger["error_js_opfs"](
      "Validation failed file is too large. Size is " + file.size,
    );
    return {
      valid: false,
      error:
        "File is too large. Maximum valid size is " +
        format_limit(MAX_MTL_BYTES) +
        ".",
    };
  }

  // Check extension
  if (!file.name.toLowerCase().endsWith(".mtl")) {
    return { valid: false, error: "File must have a .mtl extension." };
  }

  return { valid: true };
}

//export public facing functions
export { validate_mtl };
