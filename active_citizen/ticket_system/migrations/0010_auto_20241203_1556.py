# Generated by Django 3.2 on 2024-12-03 10:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ticket_system', '0009_auto_20241203_1542'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='status_code_on_change',
        ),
        migrations.AddField(
            model_name='notification',
            name='status_code_changed_on',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='ticket_system.statuscode'),
            preserve_default=False,
        ),
    ]
