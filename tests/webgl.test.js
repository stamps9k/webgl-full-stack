jest.mock('wasm-model-viewer-core', () => ({
  enable_rotate_x: jest.fn(),
  disable_rotate_x: jest.fn(),
  enable_rotate_y: jest.fn(),
  disable_rotate_y: jest.fn(),
  enable_rotate_z: jest.fn(),
  disable_rotate_z: jest.fn(),  
  initialize_web_gl: jest.fn(),
}));

import * as wasm from 'wasm-model-viewer-core';
import { fetch_vert_shader, update_rotate_x, update_rotate_y, update_rotate_z } from '../public/libs/webgl.js';

describe('webgl.js public functions', () => {
    describe('update_rotate_x', () => {
        it('enables rotate_x when checked', () => {
            update_rotate_x({ target: { checked: true } });
            expect(wasm.enable_rotate_x).toHaveBeenCalled();
        });
        it('disables rotate_x when unchecked', () => {
            update_rotate_x({ target: { checked: false } });
            expect(wasm.disable_rotate_x).toHaveBeenCalled();
        });
    });

    describe('update_rotate_y', () => {
        it('enables rotate_y when checked', () => {
            update_rotate_y({ target: { checked: true } });
            expect(wasm.enable_rotate_y).toHaveBeenCalled();
        });
        it('disables rotate_y when unchecked', () => {
            update_rotate_y({ target: { checked: false } });
            expect(wasm.disable_rotate_y).toHaveBeenCalled();
        });
    });

    describe('update_rotate_z', () => {
        it('enables rotate_z when checked', () => {
            update_rotate_z({ target: { checked: true } });
            expect(wasm.enable_rotate_z).toHaveBeenCalled();
        });
        it('disables rotate_z when unchecked', () => {
            update_rotate_z({ target: { checked: false } });
            expect(wasm.disable_rotate_z).toHaveBeenCalled();
        });
    });

    describe('fetch_vert_shader', () => {
        beforeEach(() => {
            global.fetch = jest.fn(() => Promise.resolve({
                json: () => Promise.resolve({
                    message: [
                        { shader_type: 'vert', name: 'test.vert' },
                        { shader_type: 'frag', name: 'test.frag' }
                    ]
                }),
                text: () => Promise.resolve('shader code'),
                arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
            }));
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should fetch and process vertex and fragment shaders', async () => {
            fetch_vert_shader();
            // This test will just check that fetch is called and no errors are thrown
            expect(global.fetch).toHaveBeenCalled();
        });
    });
});
