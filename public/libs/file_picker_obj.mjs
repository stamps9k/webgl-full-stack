import { logger } from "./debug_config.mjs";
import { MAX_OBJ_BYTES, format_limit } from "./file_limits.mjs";
import { change_model } from "./webgl.mjs";

/**
 * Validates that the given file is a Blender OBJ file.
 * Checks extension, reads text, looks for OBJ keywords and Blender comment.
 * Returns a Promise resolving to { valid: boolean, error?: string }
 */
async function validate_obj(file) {
  if (file.size > MAX_OBJ_BYTES) {
    logger["error_js_opfs"](
      "Validation failed file is too large. Size is " + file.size,
    );
    return {
      valid: false,
      error:
        "File is too large. Maximum valid size is " +
        format_limit(MAX_OBJ_BYTES) +
        ".",
    };
  }

  // Check extension
  if (!file.name.toLowerCase().endsWith(".obj")) {
    return { valid: false, error: "File must have a .obj extension." };
  }

  // Read first 64KB (should be enough for validation)
  const maxBytes = 65536;
  const blob = file.slice(0, maxBytes);
  let text = "";
  try {
    text = await blob.text();
  } catch (e) {
    return { valid: false, error: "Could not read file as text." };
  }

  // Check file is not empty or too small
  if (text.trim().length < 20) {
    return { valid: false, error: "File is too small to be a valid OBJ file." };
  }

  // Check for OBJ keywords and Blender comment
  const hasVertex = /^v\s+/m.test(text);
  const hasFace = /^f\s+/m.test(text);
  const hasBlender = /^# Blender/m.test(text);
  const hasObjHeader = /^#\s*Wavefront OBJ/m.test(text);
  const hasAnyObjKeyword =
    hasVertex || hasFace || /^vt\s+/m.test(text) || /^vn\s+/m.test(text);

  if (!hasAnyObjKeyword) {
    return {
      valid: false,
      error:
        "File does not appear to be a valid OBJ file (missing OBJ keywords).",
    };
  }

  // Optionally require Blender comment, but allow generic OBJ
  if (!(hasBlender || hasObjHeader)) {
    logger["warn_js_opfs"](
      "OBJ file does not have a Blender or Wavefront header comment.",
    );
  }

  return { valid: true };
}

//export public facing functions
export { validate_obj };
