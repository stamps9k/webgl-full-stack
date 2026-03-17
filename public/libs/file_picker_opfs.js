import { info, verbose, warn, error } from "./debug_config.js";
import { change_model } from "./webgl.js";

async function save_file(files) {
    const opfsRoot = await navigator.storage.getDirectory(); // OPFS root

    for (const file of files)
    {
        try {
        // Create a new file in OPFS with the same name
        const opfsHandle = await opfsRoot.getFileHandle(file.name, { create: true });
        const writable = await opfsHandle.createWritable();

        // Copy contents from uploaded file to OPFS
        await writable.write(await file.arrayBuffer());
        await writable.close();
        } catch (e) {
            error(e);
            return { valid: false, error: e };
        }

        info(`Saved ${file.name} to OPFS!`);
        return { valid: true };
    }
}

async function process_file(files) {
    for (const file of files)
    {
        if (file.name.includes('.obj'))
        {
            let text = await file.text();

            // Update the model
            change_model(text);
        }
    }

    //Clean up
    warn("TODO add file cleanup here.");
}

//export public facing functions
export { save_file, process_file }