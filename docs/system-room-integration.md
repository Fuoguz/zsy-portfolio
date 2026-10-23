# System Room integration

The homepage uses the Blender miniature as an optional four-view experience beside the personal introduction. Page scrolling does not move the camera; visitors select a view through chapter buttons or screen picking. Public content selectors, case evidence and resume links remain intact. See the final release record for deployment status.

## Assets and budget

- `public/models/system-room.glb`: 291,704 bytes, 24,400 triangles, 38 material/zone batches, 12 materials, four cameras, no textures.
- Meshopt compression and position/normal quantization reduce the AO-enabled raw GLB from 1,380,048 bytes by approximately 79%.
- Contact occlusion is stored in vertex colors; no AO texture or runtime postprocessing is required.
- Four transparent WebP posters total about 155 KB; only the active chapter is requested.
- The Three.js renderer is dynamically imported (about 160 KB gzip in the current production build). Vite reports a large optional chunk; it is not part of the initial static experience.
- Pixel ratio is capped at 1.5. A single 1024px shadow map is updated once. Rendering stops after camera/pointer motion settles and while offscreen or in a hidden document.

## Interaction and accessibility

All visitors start with a static preview and an explicit 3D switch. HTML chapter buttons and raycast clicks on the three work zones select the same camera destinations. Pointer movement adds subtle camera drift without taking over scrolling. The screen contains neutral Plan / Role / Flow labels, not unsupported project metrics.

Mobile/tablet, reduced-motion and data-saver visitors receive the static experience first, with an explicit 3D switch. Reduced motion disables animated camera interpolation. Keyboard-accessible chapter buttons expose pressed state. GLB/network/WebGL failure keeps the poster, text and links available. Disabling 3D or leaving the route disposes scene resources and removes the canvas.

## Rebuild

The editable source remains `artifacts/system-room/system-room-v1.blend` (ignored by Git; preserve separately). Override its location with `SYSTEM_ROOM_BLEND` if needed.

```powershell
& 'D:\Blender 4.2\blender.exe' -b --python scripts/export-system-room.py
npm run models:optimize
& 'D:\Blender 4.2\blender.exe' -b --python scripts/render-system-room-posters.py
# Run scripts/optimize-system-room-posters.py with the existing Pillow-enabled Python runtime.
npm run dev -- --host 127.0.0.1 --port 5178
npm run qa:system-room
```

The export and poster scripts apply scripts/system_room_labels.py to an in-memory copy before converting text or rendering. They do not overwrite the source Blend. Export batches meshes by semantic zone and bakes contact AO; the optimizer re-reads the compressed GLB and enforces size, camera and batch budgets.

Browser QA uses Playwright with installed Edge by default. `QA_BROWSER_CHANNEL` and `QA_BASE_URL` override browser/server. Screenshots and the test report are written under `artifacts/system-room/qa/`.

## Verification and limitations

34 browser assertions cover actual mesh picking, all four cameras, idle/offscreen behavior, disposal and re-enabling, case navigation, 375/390/768/1024/1920 widths, reduced motion, failed loading and unavailable WebGL. The sampled settled Build frame uses 23 draw calls; other views and the first shadow pass have different counts. This is not an FPS guarantee for physical mobile hardware.

The artistic source and its modeled labels are conceptual illustrations, not replacements for selector-controlled case evidence. Production rendering deliberately approximates the Cycles lighting with a lightweight real-time setup.

References used: [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html), [rendering on demand](https://threejs.org/manual/en/rendering-on-demand.html), [glTF Transform functions](https://gltf-transform.dev/functions).
