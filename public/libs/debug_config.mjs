import debug from "debug";

/*---------------------------------------------------------------------------*/
const logger_api =
{
    //Predefined model lookups, query results
    super_super_verbose_api_model: debug("api:model:SUPER_SUPER_VERBOSE"),
    super_verbose_api_model: debug("api:model:SUPER_VERBOSE"),
    verbose_api_model: debug("api:model:VERBOSE"),
    info_api_model: debug("api:model:INFO"),
    warn_api_model: debug("api:model:WARN"),
    error_api_model: debug("api:model:ERROR"),

    //Texture record lookups, cache hit/miss
    super_super_verbose_api_texture: debug("api:texture:SUPER_SUPER_VERBOSE"),
    super_verbose_api_texture: debug("api:texture:SUPER_VERBOSE"),
    verbose_api_texture: debug("api:texture:VERBOSE"),
    info_api_texture: debug("api:texture:INFO"),
    warn_api_texture: debug("api:texture:WARN"),
    error_api_texture: debug("api:texture:ERROR"),    

    //Raw DB connection, query timing, errors
    super_super_verbose_api_db: debug("api:db:SUPER_SUPER_VERBOSE"),
    super_verbose_api_db: debug("api:db:SUPER_VERBOSE"),
    verbose_api_db: debug("api:db:VERBOSE"),
    info_api_db: debug("api:db:INFO"),
    warn_api_db: debug("api:db:WARN"),
    error_api_db: debug("api:db:ERROR"),
}

logger_api["super_super_verbose_api_model"]("Super Super Verbose debugging enabled for API model queries.");
logger_api["super_verbose_api_model"]("Super Verbose debugging enabled for API model queries.");
logger_api["verbose_api_model"]("Verbose debugging enabled for API model queries.");
logger_api["info_api_model"]("Info debugging enabled for API model queries.");
logger_api["warn_api_model"]("Warn debugging enabled  for API model queries.");
logger_api["error_api_model"]("Error debugging enabled for API model queries.");

logger_api["super_super_verbose_api_texture"]("Super Super Verbose debugging enabled for API texture queries.");
logger_api["super_verbose_api_texture"]("Super Verbose debugging enabled for API texture queries.");
logger_api["verbose_api_texture"]("Verbose debugging enabled for API texture queries.");
logger_api["info_api_texture"]("Info debugging enabled for API texture queries.");
logger_api["warn_api_texture"]("Warn debugging enabled  for API texture queries.");
logger_api["error_api_texture"]("Error debugging enabled for API texture queries.");

logger_api["super_super_verbose_api_db"]("Super Super Verbose debugging enabled for API db connections.");
logger_api["super_verbose_api_db"]("Super Verbose debugging enabled for API db connections.");
logger_api["verbose_api_db"]("Verbose debugging enabled for API db connections.");
logger_api["info_api_db"]("Info debugging enabled for API db connections.");
logger_api["warn_api_db"]("Warn debugging enabled  for API db connections.");
logger_api["error_api_db"]("Error debugging enabled for API db connections.");
/*---------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------*/
const logger = 
{
    // Resources fetch logging. outbound requests, response codes, timing, retries, etc.
    super_super_verbose_js_fetch: debug("js:fetch:SUPER_SUPER_VERBOSE"),
    super_verbose_js_fetch: debug("js:fetch:SUPER_VERBOSE"),
    verbose_js_fetch: debug("js:fetch:VERBOSE"),
    info_js_fetch: debug("js:fetch:INFO"),
    warn_js_fetch: debug("js:fetch:WARN"),
    error_js_fetch: debug("js:fetch:ERROR"),

    // Rust wasm logging. Anything created in rust.
    super_super_verbose_js_wasm: debug("js:wasm:SUPER_SUPER_VERBOSE"),
    super_verbose_js_wasm: debug("js:wasm:SUPER_VERBOSE"),
    verbose_js_wasm: debug("js:wasm:VERBOSE"),
    info_js_wasm: debug("js:wasm:INFO"),
    warn_js_wasm: debug("js:wasm:WARN"),
    error_js_wasm: debug("js:wasm:ERROR"),

    // OPFS logging. OPFS file reads/writes, cache hits, errors
    super_super_verbose_js_opfs: debug("js:opfs:SUPER_SUPER_VERBOSE"),
    super_verbose_js_opfs: debug("js:opfs:SUPER_VERBOSE"),
    verbose_js_opfs: debug("js:opfs:VERBOSE"),
    info_js_opfs: debug("js:opfs:INFO"),
    warn_js_opfs: debug("js:opfs:WARN"),
    error_js_opfs: debug("js:opfs:ERROR")
}

logger["super_super_verbose_js_fetch"]("Super Super Verbose debugging enabled for JavaScript fetch.");
logger["super_verbose_js_fetch"]("Super Verbose debugging enabled for JavaScript fetch.");
logger["verbose_js_fetch"]("Verbose debugging enabled for JavaScript fetch.");
logger["info_js_fetch"]("Info debugging enabled for JavaScript fetch.");
logger["warn_js_fetch"]("Warn debugging enabled  for JavaScript fetch.");
logger["error_js_fetch"]("Error debugging enabled for JavaScript fetch.");

logger["super_super_verbose_js_wasm"]("Super Super Verbose debugging enabled for JavaScript wasm.");
logger["super_verbose_js_wasm"]("Super Verbose debugging enabled for JavaScript wasm.");
logger["verbose_js_wasm"]("Verbose debugging enabled for JavaScript wasm.");
logger["info_js_wasm"]("Info debugging enabled for JavaScript wasm.");
logger["warn_js_wasm"]("Warn debugging enabled  for JavaScript wasm.");
logger["error_js_wasm"]("Error debugging enabled for JavaScript wasm.");

logger["super_super_verbose_js_opfs"]("Super Super Verbose debugging enabled for JavaScript OPFS.");
logger["super_verbose_js_opfs"]("Super Verbose debugging enabled for JavaScript OPFS.");
logger["verbose_js_opfs"]("Verbose debugging enabled for JavaScript OPFS.");
logger["info_js_opfs"]("Info debugging enabled for JavaScript OPFS.");
logger["warn_js_opfs"]("Warn debugging enabled  for JavaScript OPFS.");
logger["error_js_opfs"]("Error debugging enabled for JavaScript OPFS.");
/*---------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------*/
const logger_wasm = 
{
    // Parse logging. OBJ parsing, triangulation, vertex/index counts, etc
    super_super_verbose_wasm_parse: debug("wasm:parse:SUPER_SUPER_VERBOSE"),
    super_verbose_wasm_parse: debug("wasm:parse:SUPER_VERBOSE"),
    verbose_wasm_parse: debug("wasm:parse:VERBOSE"),
    info_wasm_parse: debug("wasm:parse:INFO"),
    warn_wasm_parse: debug("wasm:parse:WARN"),
    error_wasm_parse: debug("wasm:parse:ERROR"),

    // Scene logging. Scene graph mutations, object add/remove/hot-swap, etc
    super_super_verbose_wasm_scene: debug("wasm:scene:SUPER_SUPER_VERBOSE"),
    super_verbose_wasm_scene: debug("wasm:scene:SUPER_VERBOSE"),
    verbose_wasm_scene: debug("wasm:scene:VERBOSE"),
    info_wasm_scene: debug("wasm:scene:INFO"),
    warn_wasm_scene: debug("wasm:scene:WARN"),
    error_wasm_scene: debug("wasm:scene:ERROR"),

    // Math logging. Matrix/vector ops (very noisy)
    super_super_verbose_wasm_math: debug("wasm:math:SUPER_SUPER_VERBOSE"),
    super_verbose_wasm_math: debug("wasm:math:SUPER_VERBOSE"),
    verbose_wasm_math: debug("wasm:math:VERBOSE"),
    info_wasm_math: debug("wasm:math:INFO"),
    warn_wasm_math: debug("wasm:math:WARN"),
    error_wasm_math: debug("wasm:math:ERROR"),

    // WebGL data logging. WebGL2 calls, buffer uploads, VAO bind, draw calls, GL errors
    super_super_verbose_wasm_gpu_data: debug("wasm:gpu_data:SUPER_SUPER_VERBOSE"),
    super_verbose_wasm_gpu_data: debug("wasm:gpu_data:SUPER_VERBOSE"),
    verbose_wasm_gpu_data: debug("wasm:gpu_data:VERBOSE"),
    info_wasm_gpu_data: debug("wasm:gpu_data:INFO"),
    warn_wasm_gpu_data: debug("wasm:gpu_data:WARN"),
    error_wasm_gpu_data: debug("wasm:gpu_data:ERROR"),

    // GPU memory logging. Buffer alloc/dealloc, delete_buffer, GPU memory lifecycle
    super_super_verbose_wasm_gpu_mem: debug("wasm:gpu_mem:SUPER_SUPER_VERBOSE"),
    super_verbose_wasm_gpu_mem: debug("wasm:gpu_mem:SUPER_VERBOSE"),
    verbose_wasm_gpu_mem: debug("wasm:gpu_mem:VERBOSE"),
    info_wasm_gpu_mem: debug("wasm:gpu_mem:INFO"),
    warn_wasm_gpu_mem: debug("wasm:gpu_mem:WARN"),
    error_wasm_gpu_mem: debug("wasm:gpu_mem:ERROR")
}

logger_wasm["super_super_verbose_wasm_parse"]("Super Super Verbose debugging enabled for wasm parsing.");
logger_wasm["super_verbose_wasm_parse"]("WebAssembly Super Verbose debugging enabled for wasm parsing.");
logger_wasm["verbose_wasm_parse"]("WebAssembly Verbose debugging enabled for wasm parsing.");
logger_wasm["info_wasm_parse"]("WebAssembly Info debugging enabled for wasm parsing.");
logger_wasm["warn_wasm_parse"]("WebAssembly Warn debugging enable for wasm parsing.");
logger_wasm["error_wasm_parse"]("WebAssembly Error debugging enabled for wasm parsing.");

logger_wasm["super_super_verbose_wasm_scene"]("Super Super Verbose debugging enabled for wasm scene management.");
logger_wasm["super_verbose_wasm_scene"]("WebAssembly Super Verbose debugging enabled for wasm scene management.");
logger_wasm["verbose_wasm_scene"]("WebAssembly Verbose debugging enabled for wasm scene management.");
logger_wasm["info_wasm_scene"]("WebAssembly Info debugging enabled for wasm scene management.");
logger_wasm["warn_wasm_scene"]("WebAssembly Warn debugging enable for wasm scene management.");
logger_wasm["error_wasm_scene"]("WebAssembly Error debugging enabled for wasm scene management.");

logger_wasm["super_super_verbose_wasm_math"]("Super Super Verbose debugging enabled for wasm maths.");
logger_wasm["super_verbose_wasm_math"]("WebAssembly Super Verbose debugging enabled for wasm maths.");
logger_wasm["verbose_wasm_math"]("WebAssembly Verbose debugging enabled for wasm maths.");
logger_wasm["info_wasm_math"]("WebAssembly Info debugging enabled for wasm maths.");
logger_wasm["warn_wasm_math"]("WebAssembly Warn debugging enable for wasm maths.");
logger_wasm["error_wasm_math"]("WebAssembly Error debugging enabled for wasm maths.");

logger_wasm["super_super_verbose_wasm_gpu_data"]("Super Super Verbose debugging enabled for wasm gpu data transfer.");
logger_wasm["super_verbose_wasm_gpu_data"]("WebAssembly Super Verbose debugging enabled for wasm gpu data transfer.");
logger_wasm["verbose_wasm_gpu_data"]("WebAssembly Verbose debugging enabled for wasm gpu data transfer.");
logger_wasm["info_wasm_gpu_data"]("WebAssembly Info debugging enabled for wasm gpu data transfer.");
logger_wasm["warn_wasm_gpu_data"]("WebAssembly Warn debugging enable for wasm gpu data transfer.");
logger_wasm["error_wasm_gpu_data"]("WebAssembly Error debugging enabled for wasm gpu data transfer.");

logger_wasm["super_super_verbose_wasm_gpu_mem"]("Super Super Verbose debugging enabled for wasm gpu memory management.");
logger_wasm["super_verbose_wasm_gpu_mem"]("WebAssembly Super Verbose debugging enabled for wasm gpu memory management.");
logger_wasm["verbose_wasm_gpu_mem"]("WebAssembly Verbose debugging enabled for wasm gpu memory management.");
logger_wasm["info_wasm_gpu_mem"]("WebAssembly Info debugging enabled for wasm gpu memory management.");
logger_wasm["warn_wasm_gpu_mem"]("WebAssembly Warn debugging enable for wasm gpu memory management.");
logger_wasm["error_wasm_gpu_mem"]("WebAssembly Error debugging enabled for wasm gpu memory management.");
/*---------------------------------------------------------------------------*/

console.log("");
console.log("");

// Define a limit on detailed logging to ensure that browser is not sent too much information too quickly 
globalThis.DETAILED_LOG_LIMIT = 5000000;
globalThis.current_detailed_count = 0;

// Expose relevant functions globally (for global access from rust)
globalThis.wasm_logging_api = (message, level) => logger_wasm[level](message);

// Export from this module for access in rest of project 
export { logger, logger_api　};