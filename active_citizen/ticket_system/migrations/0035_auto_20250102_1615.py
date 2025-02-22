# Generated by Django 3.2 on 2025-01-02 11:15

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('ticket_system', '0034_auto_20250102_1031'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ticket',
            name='media',
        ),
        migrations.RemoveField(
            model_name='ticketaudit',
            name='media',
        ),
        migrations.AddField(
            model_name='media',
            name='ticket',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='ticket_system.ticket'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='category',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2025, 1, 2, 11, 15, 31, 545357, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='notification',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2025, 1, 2, 11, 15, 31, 553358, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='review',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2025, 1, 2, 11, 15, 31, 553358, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='subcategory',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2025, 1, 2, 11, 15, 31, 545357, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='supportticket',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2025, 1, 2, 11, 15, 31, 545357, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2025, 1, 2, 11, 15, 31, 545357, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='ticketaudit',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2025, 1, 2, 11, 15, 31, 545357, tzinfo=utc), verbose_name='Создано'),
        ),
    ]
