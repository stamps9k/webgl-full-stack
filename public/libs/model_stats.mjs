// Small helper for the Model Info panel — derives real numbers from the
// .obj text already fetched for rendering, rather than inventing any.
// (There's no vertex/face-count or file-size API; this is genuinely
// computed from the file the viewer just loaded.)

function compute_obj_stats(obj_text) {
  let vertices = 0;
  let faces = 0;

  const lines = obj_text.split("\n");
  for (const raw_line of lines) {
    const line = raw_line.trim();
    // OBJ allows any whitespace after the keyword, so "v\t..." counts too.
    if (/^v\s/.test(line)) {
      vertices++;
    } else if (/^f\s/.test(line)) {
      faces++;
    }
  }

  const size_bytes = new Blob([obj_text]).size;

  return { vertices, faces, size_bytes };
}

function format_bytes(size_bytes) {
  if (size_bytes == null) {
    return "—";
  }
  if (size_bytes < 1024) {
    return size_bytes + " B";
  }
  // Compare the rounded value, so sizes just under 1 MB show as "1.0 MB"
  // rather than "1024.0 KB".
  const kilobytes = (size_bytes / 1024).toFixed(1);
  if (Number(kilobytes) < 1024) {
    return kilobytes + " KB";
  }
  return (size_bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export { compute_obj_stats, format_bytes };
