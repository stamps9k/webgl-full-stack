import debug from "debug";

const super_super_verbose = debug("app:SUPER_SUPER_VERBOSE");
const super_verbose = debug("app:SUPER_VERBOSE");
const verbose = debug("app:VERBOSE");
const info = debug("app:INFO");
const warn = debug("app:WARN");
const error = debug("app:ERROR");

super_super_verbose("Super Super Verbose debugging enabled");
super_verbose("Super Verbose debugging enabled");
verbose("Verbose debugging enabled.");
info("Info debugging enabled.");
warn("Warn debugging enable");
error("Error debugging enabled.");


// Define a limit on detailed logging to ensure that browser is not sent too much information too quickly 
globalThis.DETAILED_LOG_LIMIT = 5000000;
globalThis.current_detailed_count = 0;

// Expose the function globally (for global access from rust)
globalThis.super_super_verbose_api = (message) => 
    {
        if (current_detailed_count < DETAILED_LOG_LIMIT)
        {
            current_detailed_count++;
            super_super_verbose(message);

        } 
    };
globalThis.super_verbose_api = (message) => 
    {  
        if (current_detailed_count < DETAILED_LOG_LIMIT)
        {
            current_detailed_count++;
            super_verbose(message);

        }
    };
globalThis.verbose_api = (message) => verbose(message);
globalThis.info_api = (message) => info(message);
globalThis.warn_api = (message) => warn(message);
globalThis.error_api = (message) => error(message);

// Export from this module for access in rest of project 
export { super_super_verbose, super_verbose, verbose, info, warn, error };