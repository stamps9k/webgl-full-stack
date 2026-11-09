// file_picker_opfs imports webgl.mjs, which loads the wasm package.
jest.mock('wasm-model-viewer-core-bin', () => ({}));

import { save_file } from '../public/libs/file_picker_opfs.mjs';

// Mock OPFS: records the name of every file written, and fails the write
// for any file named in failing_names.
let written_names;
let failing_names;

beforeEach(() => {
  written_names = [];
  failing_names = [];
  Object.defineProperty(global, 'navigator', {
    value: {
      storage: {
        getDirectory: jest.fn(() => Promise.resolve({
          getFileHandle: jest.fn((name) => Promise.resolve({
            createWritable: jest.fn(() => Promise.resolve({
              write: jest.fn(() => failing_names.includes(name)
                ? Promise.reject(new Error('write failed'))
                : Promise.resolve()),
              close: jest.fn(() => {
                written_names.push(name);
                return Promise.resolve();
              })
            }))
          }))
        }))
      }
    },
    configurable: true
  });
});

describe('save_file', () => {
    function makeFile(name, content) {
        // Create a mock File-like object with .slice and .text methods
        function makeBlob(blobContent) {
            return {
                async text() { return blobContent; }
            };
        }
        return {
            name,
            slice(start, end) {
                // Return a mock blob with .text()
                return makeBlob(content.slice(start, end));
            },
            arrayBuffer: async () => jest.fn(() => Promise.resolve()),
            async text() { return content; }
        };
    }

    it('fails with null file', async () => {
        const file = null;
        const result = await save_file(file);
        expect(result.valid).toBe(false);
        expect(result.error.message).toMatch(/.*null.*/);
    });

    it('fails with an empty file list', async () => {
        const result = await save_file([]);
        expect(result.valid).toBe(false);
    });

    it('succeeds on valid file submitted', async () => {
        const file = makeFile('model.obj', 'v 1.0 2.0 3.0\nf 1 2 3\nvt 0.1 0.2\nvn 0.0 1.0 0.0');
        const result = await save_file([file]);
        expect(result.valid).toBe(true);
    });

    it('saves every file in the selection', async () => {
        const files = [makeFile('model.obj', 'v 1 2 3'), makeFile('model.mtl', 'newmtl a'), makeFile('tex.png', 'png')];
        const result = await save_file(files);
        expect(result.valid).toBe(true);
        expect(written_names).toEqual(['model.obj', 'model.mtl', 'tex.png']);
    });

    it('returns the error when a write fails', async () => {
        failing_names = ['model.mtl'];
        const files = [makeFile('model.obj', 'v 1 2 3'), makeFile('model.mtl', 'newmtl a')];
        const result = await save_file(files);
        expect(result.valid).toBe(false);
        expect(result.error.message).toBe('write failed');
    });
});
