import { validate_file } from '../public/libs/file_picker.js'; // Jest setup for browser-like environment

describe('validate_file', () => {
    /*function makeFile(name, content) {
        return new File([content], name, { type: 'text/plain' });
    }*/

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
            async text() { return content; }
        };
    }

    it('rejects files without .obj extension', async () => {
        const file = makeFile('model.txt', '# Blender\nv 1.0 2.0 3.0\nf 1 2 3');
        const result = await validate_file(file);
        expect(result.valid).toBe(false);
        expect(result.error).toMatch(/\.obj/);
    });

    it('rejects empty files', async () => {
        const file = makeFile('model.obj', '');
        const result = await validate_file(file);
        expect(result.valid).toBe(false);
        expect(result.error).toMatch(/too small/);
    });

    it('rejects files missing OBJ keywords', async () => {
        const file = makeFile('model.obj', '# Blender\nThis is not an OBJ');
        const result = await validate_file(file);
        expect(result.valid).toBe(false);
        expect(result.error).toMatch(/OBJ keywords/);
    });

    it('accepts a minimal valid OBJ file', async () => {
        const file = makeFile('model.obj', '# Blender\nv 1.0 2.0 3.0\nf 1 2 3\nvt 0.1 0.2\nvn 0.0 1.0 0.0');
        const result = await validate_file(file);
        expect(result.valid).toBe(true);
    });

    it('warns if missing Blender or Wavefront header but still accepts valid OBJ', async () => {
        const file = makeFile('model.obj', 'v 1.0 2.0 3.0\nf 1 2 3\nvt 0.1 0.2\nvn 0.0 1.0 0.0');
        const result = await validate_file(file);
        expect(result.valid).toBe(true);
    });
});
