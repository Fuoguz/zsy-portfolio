import bpy, os, sys
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bpy.ops.wm.open_mainfile(filepath=os.path.join(root,'artifacts/system-room/system-room-v1.blend'))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from system_room_labels import apply_public_labels
apply_public_labels()
s=bpy.context.scene
s.render.film_transparent=True
s.render.resolution_x=1280
s.render.resolution_y=880
s.cycles.samples=32
for name in ['Hero','Eagle','Automation','Build']:
    s.camera=bpy.data.objects['Camera_'+name]
    s.render.filepath=os.path.join(root,'artifacts/system-room/poster-'+name.lower()+'.png')
    bpy.ops.render.render(write_still=True)
