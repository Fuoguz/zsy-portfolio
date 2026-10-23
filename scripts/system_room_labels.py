"""Keep the conceptual room free of unsupported project metrics."""
import bpy


def apply_public_labels():
    labels = {
        'Metric_500+': 'PLAN',
        'Metric_30': 'ROLE',
        'Metric_5': 'FLOW',
        'Metric_Label_Participants': 'Training Plan',
        'Metric_Label_REST APIs': 'Permissions',
        'Metric_Label_Core Data Models': 'Progress',
        'Automation_Status': 'CONCEPT / PREVIEW',
    }
    for name, label in labels.items():
        obj = bpy.data.objects.get(name)
        if obj is None or obj.type != 'FONT':
            raise RuntimeError('Missing conceptual screen label: ' + name)
        obj.data.body = label

