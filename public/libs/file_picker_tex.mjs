import { logger } from "./debug_config.mjs";
import { MAX_TEX_BYTES, format_limit } from "./file_limits.mjs";

/**
 * Validates that the given file is a valid texture file.
 * Only checks the extension at this point.
 * Returns a Promise resolving to { valid: boolean, error?: string }
 */
async function validate_tex(file) {
  if (file.size > MAX_TEX_BYTES) {
    logger["error_js_opfs"](
      "Validation failed file is too large. Size is " + file.size,
    );
    return {
      valid: false,
      error:
        "File is too large. Maximum valid size is " +
        format_limit(MAX_TEX_BYTES) +
        ".",
    };
  }

  // Check extension
  if (
    !file.name.toLowerCase().endsWith(".tex") &&
    !file.name.toLowerCase().endsWith(".png")
  ) {
    return { valid: false, error: "File must have a .tex or .png extension." };
  }

  return { valid: true };
}

//export public facing functions
export { validate_tex };
