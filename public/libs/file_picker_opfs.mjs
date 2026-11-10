import { logger } from "./debug_config.mjs";
import { change_model } from "./webgl.mjs";

async function save_file(files) {
  if (!files || files.length === 0) {
    return {
      valid: false,
      error: new Error("No files to save (files was null or empty)."),
    };
  }

  const opfsRoot = await navigator.storage.getDirectory(); // OPFS root

  for (const file of files) {
    try {
      // Create a new file in OPFS with the same name
      const opfsHandle = await opfsRoot.getFileHandle(file.name, {
        create: true,
      });
      const writable = await opfsHandle.createWritable();

      // Copy contents from uploaded file to OPFS
      await writable.write(await file.arrayBuffer());
      await writable.close();
    } catch (e) {
      logger["error_js_opfs"](`Failed to save ${file.name} to OPFS: ${e}`);
      return { valid: false, error: e };
    }

    logger["info_js_opfs"](`Saved ${file.name} to OPFS!`);
  }

  return { valid: true };
}

async function process_file(files) {
  for (const file of files) {
    if (file.name.includes(".obj")) {
      let text = await file.text();

      // Update the model
      change_model(text);
    }
  }

  //Clean up
  logger["warn_js_opfs"]("TODO add file cleanup here.");
}

//export public facing functions
export { save_file, process_file };
