// file_picker_obj imports webgl.mjs, which loads the wasm package.
jest.mock('wasm-model-viewer-core', () => ({}));

import { validate_files } from '../public/libs/file_picker_validate.mjs';
import { MAX_OBJ_BYTES, MAX_MTL_BYTES, MAX_TEX_BYTES } from '../public/libs/file_limits.mjs';

describe('validate_files', () => {
    function makeFile(name, content = '', size = content.length) {
        return {
            name,
            size,
            slice(start, end) {
                return { async text() { return content.slice(start, end); } };
            },
            async text() { return content; }
        };
    }

    const valid_obj = () => makeFile('model.obj', '# Blender\nv 1.0 2.0 3.0\nf 1 2 3\nvt 0.1 0.2\nvn 0.0 1.0 0.0');

    it('accepts a valid obj, mtl and texture together', async () => {
        const result = await validate_files([valid_obj(), makeFile('model.mtl', 'newmtl a'), makeFile('tex.png', 'png')]);
        expect(result.valid).toBe(true);
    });

    it('rejects the selection when an earlier file is invalid', async () => {
        const result = await validate_files([makeFile('broken.obj', 'not an obj file at all, really'), makeFile('tex.png', 'png')]);
        expect(result.valid).toBe(false);
        expect(result.error).toMatch(/^broken\.obj: .*OBJ keywords/);
    });

    it('rejects unknown file types', async () => {
        const result = await validate_files([valid_obj(), makeFile('notes.txt', 'hello')]);
        expect(result.valid).toBe(false);
        expect(result.error).toMatch(/Unknown file type \.txt/);
    });

    it('chooses the validator by extension, not by name', async () => {
        // Previously "object.png" matched the OBJ check because its name contains "obj".
        const result = await validate_files([makeFile('object.png', 'png')]);
        expect(result.valid).toBe(true);
    });

    it('rejects an empty selection', async () => {
        const result = await validate_files([]);
        expect(result.valid).toBe(false);
    });

    it.each([
        ['big.obj', MAX_OBJ_BYTES, /100MB/],
        ['big.mtl', MAX_MTL_BYTES, /10MB/],
        ['big.png', MAX_TEX_BYTES, /100MB/],
    ])('rejects %s one byte over its limit', async (name, limit, message) => {
        const result = await validate_files([makeFile(name, '', limit + 1)]);
        expect(result.valid).toBe(false);
        expect(result.error).toMatch(/too large/);
        expect(result.error).toMatch(message);
    });

    it('accepts a texture exactly at its limit', async () => {
        const result = await validate_files([makeFile('big.png', 'png', MAX_TEX_BYTES)]);
        expect(result.valid).toBe(true);
    });
});
