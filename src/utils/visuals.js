const isImage = (item) => item?.publicSafe === true && ["SCREENSHOT", "PROCESS_DIAGRAM"].includes(item.type);

// Real screenshots outrank reconstructed diagrams; the widest one reads best as a cover.
export function primaryVisual(project) {
  const images = project.evidence.filter(isImage);
  const screenshots = images.filter((item) => item.type === "SCREENSHOT").sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
  return screenshots[0] ?? images[0];
}
