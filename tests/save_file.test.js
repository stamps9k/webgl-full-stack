import { save_file } from '../public/libs/file_picker.js'; // Jest setup for browser-like environment

beforeAll(() => {
  Object.defineProperty(global, 'navigator', {
    value: {
      storage: {
        getDirectory: jest.fn(() => Promise.resolve({
          getFileHandle: jest.fn(() => Promise.resolve({
            createWritable: jest.fn(() => Promise.resolve({
              write: jest.fn(() => Promise.resolve()),
              close: jest.fn(() => Promise.resolve())
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

    it('succeeds on valid file submitted', async () => {
        const file = makeFile('model.obj', 'v 1.0 2.0 3.0\nf 1 2 3\nvt 0.1 0.2\nvn 0.0 1.0 0.0');
        const result = await save_file(file);
        expect(result.valid).toBe(true);
    });
});
