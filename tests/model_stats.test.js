import {
  compute_obj_stats,
  format_bytes,
} from "../public/libs/model_stats.mjs";

describe("compute_obj_stats", () => {
  it("counts vertex and face lines", () => {
    const obj = ["v 0 0 0", "v 1 0 0", "v 0 1 0", "f 1 2 3"].join("\n");
    expect(compute_obj_stats(obj)).toMatchObject({ vertices: 3, faces: 1 });
  });

  it("ignores normals, texture coordinates, comments and other statements", () => {
    const obj = [
      "# a comment with v and f",
      "mtllib cube.mtl",
      "o Cube",
      "v 0 0 0",
      "vn 0 0 1",
      "vt 0 0",
      "usemtl red",
      "s off",
      "f 1/1/1 1/1/1 1/1/1",
    ].join("\n");
    expect(compute_obj_stats(obj)).toMatchObject({ vertices: 1, faces: 1 });
  });

  it("handles Windows line endings and indented lines", () => {
    const obj = "v 0 0 0\r\n  v 1 0 0\r\n\tf 1 2 1\r\n";
    expect(compute_obj_stats(obj)).toMatchObject({ vertices: 2, faces: 1 });
  });

  it("counts lines separated by tabs", () => {
    const obj = "v\t0 0 0\nv\t1 0 0\nf\t1 2 1\n";
    expect(compute_obj_stats(obj)).toMatchObject({ vertices: 2, faces: 1 });
  });

  it("returns zeros for an empty file", () => {
    expect(compute_obj_stats("")).toEqual({
      vertices: 0,
      faces: 0,
      size_bytes: 0,
    });
  });

  it("reports the size in bytes, not characters", () => {
    // "é" is two bytes in UTF-8.
    expect(compute_obj_stats("# é\n").size_bytes).toBe(5);
    expect(compute_obj_stats("v 0 0 0\n").size_bytes).toBe(8);
  });
});

describe("format_bytes", () => {
  it("shows a dash when there is no size", () => {
    expect(format_bytes(null)).toBe("—");
    expect(format_bytes(undefined)).toBe("—");
  });

  it("shows bytes below 1 KB", () => {
    expect(format_bytes(0)).toBe("0 B");
    expect(format_bytes(1023)).toBe("1023 B");
  });

  it("shows kilobytes to one decimal place below 1 MB", () => {
    expect(format_bytes(1024)).toBe("1.0 KB");
    expect(format_bytes(1536)).toBe("1.5 KB");
  });

  it("rounds sizes just under 1 MB up to 1.0 MB, not 1024.0 KB", () => {
    expect(format_bytes(1024 * 1024 - 1)).toBe("1.0 MB");
    expect(format_bytes(1024 * 1023.94)).toBe("1023.9 KB");
  });

  it("shows megabytes to one decimal place from 1 MB", () => {
    expect(format_bytes(1024 * 1024)).toBe("1.0 MB");
    expect(format_bytes(100 * 1024 * 1024)).toBe("100.0 MB");
  });
});
