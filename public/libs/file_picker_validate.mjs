import * as fp_obj from "./file_picker_obj.mjs";
import * as fp_mat from "./file_picker_mtl.mjs";
import * as fp_tex from "./file_picker_tex.mjs";

/**
 * Validates every file in a selection, choosing the validator by extension.
 * Stops at the first invalid file, so one bad file rejects the whole
 * selection. Returns a Promise resolving to { valid: boolean, error?: string }
 */
async function validate_files(files) {
  if (!files || files.length === 0) {
    return { valid: false, error: "No files selected." };
  }

  for (const file of files) {
    const extension = file.name.toLowerCase().split(".").pop();
    let validation_result;

    switch (extension) {
      case "obj":
        validation_result = await fp_obj.validate_obj(file);
        break;
      case "mtl":
        validation_result = await fp_mat.validate_mtl(file);
        break;
      case "tex":
      case "png":
        validation_result = await fp_tex.validate_tex(file);
        break;
      default:
        return {
          valid: false,
          error: "Unknown file type ." + extension + " (" + file.name + ")",
        };
    }

    if (validation_result.valid === false) {
      return {
        valid: false,
        error: file.name + ": " + validation_result.error,
      };
    }
  }

  return { valid: true };
}

//export public facing functions
export { validate_files };
