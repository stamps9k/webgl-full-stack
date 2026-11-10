# webgl-full-stack

A full-stack version of my earlier static WebGL project. It has a React front end for viewing 3D models, rendered with WebGL 2 by the Rust/WebAssembly engine [`wasm-model-viewer-core`](https://github.com/stamps9k/wasm-model-viewer-core), and an Express API that serves the built-in models, shaders and textures from a SQLite database.

You can also open your own Wavefront models (`.obj`, with optional `.mtl` and PNG textures). Uploaded files stay in the browser, stored in the Origin Private File System (OPFS), and are never sent to the server. Size limits are set in `public/libs/file_limits.mjs` (OBJ 100 MB, MTL 10 MB, textures 100 MB).

## How to run

```bash
npm install
npm run dev     # Express API on port 5000 (restarts on change)
npm start       # webpack dev server on port 8080, proxies /api to port 5000
```

Then open <http://localhost:8080>.

For production, `npm run build` bundles the front end into `dist/`, and `npm run prod` starts a single Express server on port 5000 (or `PORT`) that serves both `dist/` and the API. The `Dockerfile` does the same, and the GitHub workflow publishes the image from the `deploy-latest` branch.

The wasm engine comes from the [`wasm-model-viewer-core-bin`](https://github.com/stamps9k/wasm-model-viewer-core-bin) repo and is installed as the `wasm-model-viewer-core` package. To move to its latest build:

```bash
npm install github:stamps9k/wasm-model-viewer-core-bin
```

## Tests

```bash
npm test
```

Jest suites in `tests/` cover the file picker, upload validation and the WebGL glue code. The pre-commit hook runs them, along with a security audit when dependency files change.

## Debugging

Logging uses the [`debug`](https://www.npmjs.com/package/debug) package, with namespaces of the form `<area>:<LEVEL>`. The levels are `SUPER_SUPER_VERBOSE`, `SUPER_VERBOSE`, `VERBOSE`, `INFO`, `WARN` and `ERROR`, and wildcards work.

### Server side

Set the `DEBUG` environment variable before starting the API. The server areas are `api:db`, `api:model` and `api:texture`. For example:

```bash
DEBUG="api:*:INFO,api:*:WARN,api:*:ERROR" npm run dev
```

### Client side

Set `localStorage.debug` in the browser console and reload. The client areas are `js:fetch`, `js:opfs` and `js:wasm` for the JavaScript, and `wasm:gpu_data`, `wasm:gpu_mem`, `wasm:math`, `wasm:parse` and `wasm:scene` for messages from the Rust engine. For example:

```js
localStorage.debug = "js:*,wasm:scene:*";
```

## License

GPL-3.0
