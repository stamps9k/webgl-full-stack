import { info, verbose, warn, error } from "./debug_config.js";

function validate_file(file) {
    warn("TODO add file validation logic");
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