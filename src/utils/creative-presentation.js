export function getCreativePresentation(project) {
  const materials = project.evidence.filter(item => item.publicSafe && item.asset);
  return {
    preview: materials.find(item => item.type === "SCREENSHOT"),
    experience: materials.find(item => item.type === "LIVE_DEMO"),
    video: materials.find(item => item.type === "VIDEO"),
    hasMaterials: materials.length > 0 || Boolean(project.creativeDrafts?.scripts.length),
  };
}
