"""Run with Blender --background --python scripts/export-system-room.py.
Exports a web copy; never saves over the editable source Blend.
"""
import bpy
import os
import math
import sys
from mathutils import Vector
from mathutils.bvhtree import BVHTree

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE = os.environ.get('SYSTEM_ROOM_BLEND', os.path.join(ROOT, 'artifacts/system-room/system-room-v1.blend'))
bpy.ops.wm.open_mainfile(filepath=SOURCE)
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from system_room_labels import apply_public_labels
apply_public_labels()
for o in list(bpy.context.scene.objects):
    if o.type == 'LIGHT': bpy.data.objects.remove(o, do_unlink=True)
bpy.ops.object.select_all(action='DESELECT')
for o in bpy.context.scene.objects:
    if o.type == 'FONT': o.select_set(True); bpy.context.view_layer.objects.active = o
bpy.ops.object.convert(target='MESH')
for o in bpy.context.scene.objects:
    if o.type == 'MESH': o.data = o.data.copy()

# Batch static geometry by semantic zone and material. Preserve the camera rig.
for col in list(bpy.data.collections):
    meshes = [o for o in col.objects if o.type == 'MESH']
    batches = {}
    for o in meshes:
        key = o.data.materials[0].name if o.data.materials else 'Default'
        batches.setdefault(key, []).append(o)
    for material, objects in batches.items():
        bpy.ops.object.select_all(action='DESELECT')
        for o in objects: o.select_set(True)
        bpy.context.view_layer.objects.active = objects[0]
        if len(objects) > 1: bpy.ops.object.join()
        merged = bpy.context.view_layer.objects.active
        merged.name = col.name + '__' + material
        merged['zone'] = col.name
        bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
        # One origin for each material batch; grouped root remains editable.
        bpy.context.scene.cursor.location = (0, 0, 0)
        bpy.ops.object.origin_set(type='ORIGIN_CURSOR')

# Bake low-frequency contact occlusion into vertex colors (no AO texture/runtime pass).
all_meshes = [o for o in bpy.context.scene.objects if o.type == 'MESH']
vertices, polygons = [], []
for o in all_meshes:
    start = len(vertices)
    vertices.extend(o.matrix_world @ v.co for v in o.data.vertices)
    polygons.extend([start + i for i in p.vertices] for p in o.data.polygons)
bvh = BVHTree.FromPolygons(vertices, polygons)
samples = 24
cache = {}
for o in all_meshes:
    attr = o.data.color_attributes.new(name='Baked_Contact_AO', type='FLOAT_COLOR', domain='CORNER')
    o.data.color_attributes.active_color = attr
    normal_matrix = o.matrix_world.to_3x3().inverted().transposed()
    for p in o.data.polygons:
        normal = (normal_matrix @ p.normal).normalized()
        tangent = normal.cross(Vector((0, 0, 1)) if abs(normal.z) < .9 else Vector((1, 0, 0))).normalized()
        bitangent = normal.cross(tangent)
        for li in p.loop_indices:
            position = o.matrix_world @ o.data.vertices[o.data.loops[li].vertex_index].co
            key = tuple(round(x, 4) for x in (*position, *normal))
            if key not in cache:
                occlusion = 0
                origin = position + normal * .006
                for i in range(samples):
                    radius = math.sqrt((i + .5) / samples)
                    phi = i * 2.3999632297
                    direction = tangent * (radius * math.cos(phi)) + bitangent * (radius * math.sin(phi)) + normal * math.sqrt(1 - radius * radius)
                    hit, _, _, distance = bvh.ray_cast(origin, direction, .75)
                    if hit is not None: occlusion += (1 - distance / .75)
                cache[key] = 1 - .65 * occlusion / samples
            value = cache[key]
            attr.data[li].color = (value, value, value, 1)

dest = os.path.join(ROOT, 'artifacts/system-room/system-room-raw.glb')
bpy.ops.export_scene.gltf(filepath=dest, export_format='GLB', export_cameras=True,
    export_lights=False, export_extras=True, export_animations=False,
    export_texcoords=False, export_normals=True, export_yup=True, export_vertex_color='ACTIVE')
print('Web copy exported:', dest)
