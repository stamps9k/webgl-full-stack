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

// Export from this module for access in rest of project 
export { super_super_verbose, super_verbose, verbose, info, warn, error };