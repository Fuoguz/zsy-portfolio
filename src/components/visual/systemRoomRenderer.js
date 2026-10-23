import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

// This module and its renderer load independently from the page's content.
export function createSystemRoom(host, url, { onReady, onError, onSelect, reducedMotion }) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
  scene.add(new THREE.HemisphereLight(0xfff5df, 0x777c64, 2));
  const key = new THREE.DirectionalLight(0xffe2bb, 3.2);
  key.position.set(-3, 7, 5); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: .5, far: 22 });
  key.shadow.normalBias = .025; key.shadow.bias = -.00015; key.shadow.radius = 3; scene.add(key);
  const fill = new THREE.DirectionalLight(0xe0ecff, 1);
  fill.position.set(5, 4, -2); scene.add(fill);
  const lamp = new THREE.PointLight(0xffc38b, 2, 3, 2);
  lamp.position.set(3.1, 3.1, -.5); scene.add(lamp);
  const pointer = new THREE.Vector2(), raycaster = new THREE.Raycaster();
  const aim = new THREE.Vector3(), nextPosition = new THREE.Vector3(), nextAim = new THREE.Vector3(), offset = new THREE.Vector3();
  const meshes = [];
  let poses = [], disposed = false, visible = true, raf = 0, lastTime = 0;
  let targetProgress = 0, progress = 0, driftX = 0, driftY = 0, desiredX = 0, desiredY = 0, frameCount = 0;
  const targets = [new THREE.Vector3(0, 1.35, -.22), new THREE.Vector3(.05, 2.27, -.70), new THREE.Vector3(-2.05, 2.08, -.64), new THREE.Vector3(3.1, 2.45, -1)];
  function requestFrame() {
    if (!disposed && visible && !document.hidden && !raf && poses.length) raf = requestAnimationFrame(render);
  }
  function render(time) {
    raf = 0;
    if (disposed || !visible || document.hidden) return;
    const dt = Math.min((time - lastTime) / 1000 || .016, .05); lastTime = time;
    const blend = reducedMotion ? 1 : 1 - Math.exp(-dt * 7);
    progress = THREE.MathUtils.lerp(progress, targetProgress, blend);
    driftX = THREE.MathUtils.lerp(driftX, desiredX, blend); driftY = THREE.MathUtils.lerp(driftY, desiredY, blend);
    const from = Math.min(Math.floor(progress), 2), t = progress - from, smooth = t * t * (3 - 2 * t);
    nextPosition.lerpVectors(poses[from].position, poses[from + 1].position, smooth);
    nextAim.lerpVectors(targets[from], targets[from + 1], smooth);
    offset.copy(nextPosition).sub(nextAim).multiplyScalar(Math.max(1, 1.46 / camera.aspect));
    camera.position.copy(nextAim).add(offset);
    camera.position.x += driftX * .18; camera.position.y += driftY * .09;
    aim.copy(nextAim);
    camera.fov = THREE.MathUtils.lerp(poses[from].fov, poses[from + 1].fov, smooth);
    camera.updateProjectionMatrix(); camera.lookAt(aim);
    renderer.render(scene, camera);
    // Local QA counters, not analytics.
    host.dataset.drawCalls = String(renderer.info.render.calls);
    host.dataset.triangles = String(renderer.info.render.triangles);
    host.dataset.frames = String(++frameCount);
    host.dataset.cameraProgress = progress.toFixed(3);
    if (Math.abs(progress - targetProgress) > .0005 || Math.abs(driftX - desiredX) + Math.abs(driftY - desiredY) > .002) requestFrame();
  }
  function resize() {
    if (disposed) return;
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(Math.max(width, 1), Math.max(height, 1)); camera.aspect = Math.max(width, 1) / Math.max(height, 1); requestFrame();
  }
  function pick(event) {
    const rect = host.getBoundingClientRect();
    pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(meshes, false)[0];
    const zone = hit?.object.userData.zone || hit?.object.name || '';
    return zone.includes('Eagle') ? 1 : zone.includes('Automation') ? 2 : zone.includes('Build_Prototype') ? 3 : null;
  }
  function pointerMove(event) {
    if (event.pointerType === 'touch') return;
    const rect = host.getBoundingClientRect();
    if (!reducedMotion) { desiredX = (event.clientX - rect.left) / rect.width - .5; desiredY = -((event.clientY - rect.top) / rect.height - .5); }
    host.style.cursor = pick(event) === null ? 'default' : 'pointer'; requestFrame();
  }
  function leave() { desiredX = 0; desiredY = 0; host.style.cursor = ''; requestFrame(); }
  let down = null;
  function pointerDown(event) { down = [event.clientX, event.clientY]; }
  function pointerUp(event) {
    if (!down || Math.hypot(event.clientX - down[0], event.clientY - down[1]) > 8) return;
    down = null; const index = pick(event); if (index !== null) onSelect(index);
  }
  function contextLost(event) { event.preventDefault(); onError(); }
  function documentVisible() { requestFrame(); }
  const observer = new ResizeObserver(resize); observer.observe(host);
  const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; requestFrame(); }); intersection.observe(host);
  host.addEventListener('pointermove', pointerMove); host.addEventListener('pointerleave', leave);
  host.addEventListener('pointerdown', pointerDown); host.addEventListener('pointerup', pointerUp);
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  document.addEventListener('visibilitychange', documentVisible);
  const controller = new AbortController();
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  fetch(url, { signal: controller.signal })
    .then(response => { if (!response.ok) throw new Error('Scene unavailable'); return response.arrayBuffer(); })
    .then(bytes => disposed ? null : loader.parseAsync(bytes, ''))
    .then(gltf => {
      if (!gltf) return;
      if (disposed) { disposeModel(gltf.scene); return; }
      scene.add(gltf.scene); gltf.scene.updateMatrixWorld(true);
      gltf.scene.traverse(object => {
        if (!object.isMesh) return;
        meshes.push(object); object.castShadow = !object.name.includes('UI_'); object.receiveShadow = true;
      });
      poses = ['Camera_Hero', 'Camera_Eagle', 'Camera_Automation', 'Camera_Build'].map(name => {
        const source = gltf.cameras.find(c => c.name === name);
        if (!source) throw new Error('Missing camera');
        return { position: source.getWorldPosition(new THREE.Vector3()), fov: source.fov };
      });
      progress = targetProgress; renderer.shadowMap.needsUpdate = true; resize(); onReady(); requestFrame();
    }).catch(error => { if (!disposed && error.name !== 'AbortError') onError(); });
  function disposeModel(root) {
    const geometries = new Set(), materials = new Set(), textures = new Set();
    root.traverse(o => { if (o.geometry) geometries.add(o.geometry); if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => materials.add(m)); });
    materials.forEach(material => Object.values(material).forEach(value => { if (value?.isTexture) textures.add(value); }));
    geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(texture => texture.dispose());
  }
  return {
    setProgress(value) { targetProgress = THREE.MathUtils.clamp(value, 0, 3); requestFrame(); },
    dispose() {
      disposed = true; controller.abort(); cancelAnimationFrame(raf); observer.disconnect(); intersection.disconnect();
      host.style.cursor = '';
      host.removeEventListener('pointermove', pointerMove); host.removeEventListener('pointerleave', leave);
      host.removeEventListener('pointerdown', pointerDown); host.removeEventListener('pointerup', pointerUp);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost); document.removeEventListener('visibilitychange', documentVisible);
      disposeModel(scene); key.shadow.dispose(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    },
  };
}
