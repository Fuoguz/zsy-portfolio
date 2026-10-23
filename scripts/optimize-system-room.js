import { mkdir, stat, writeFile } from 'node:fs/promises';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, prune, weld, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';

await MeshoptEncoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder,
});
const input = 'artifacts/system-room/system-room-raw.glb';
const output = 'public/models/system-room.glb';
const document = await io.read(input);
await document.transform(dedup(), weld(), prune(), meshopt({ encoder: MeshoptEncoder, level: 'high', quantizePosition: 14, quantizeNormal: 10 }));
await mkdir('public/models', { recursive: true });
await io.write(output, document);
// Re-read the compressed asset, not just the in-memory input.
const verified = await io.read(output);
const root = verified.getRoot();
const report = {
  inputBytes: (await stat(input)).size, outputBytes: (await stat(output)).size,
  meshes: root.listMeshes().length,
  primitives: root.listMeshes().reduce((n, m) => n + m.listPrimitives().length, 0),
  triangles: root.listMeshes().reduce((n, m) => n + m.listPrimitives().reduce((sum, p) => sum + (p.getIndices()?.getCount() ?? p.getAttribute('POSITION').getCount()) / 3, 0), 0),
  materials: root.listMaterials().length, textures: root.listTextures().length,
  cameras: root.listCameras().map(c => c.getName()),
  extensions: root.listExtensionsUsed().map(e => e.extensionName),
};
if (report.outputBytes > 1_000_000 || report.cameras.length !== 4 || report.primitives > 60) throw new Error('Scene budget or camera contract failed');
await writeFile('artifacts/system-room/glb-report.json', JSON.stringify(report, null, 2));
console.log(report);
