# Generated by Django 3.2 on 2025-01-02 11:15

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_alter_moderatorsetuped_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='moderatorsetuped',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2025, 1, 2, 11, 15, 31, 545357, tzinfo=utc)),
        ),
    ]
