function set_fps(fps)
{
    //TODO reimplement in react style
    //$("#fps").html("FPS - " + Math.round(fps));
}


// Expose the function globally (for global access from rust)
globalThis.set_fps = (fps) => set_fps(fps);

// Export from this module for access in rest of project 
export { set_fps };
