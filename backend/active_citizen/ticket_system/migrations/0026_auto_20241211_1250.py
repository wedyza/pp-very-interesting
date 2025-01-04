# Generated by Django 3.2 on 2024-12-11 07:50

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('ticket_system', '0025_auto_20241211_1250'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 11, 7, 50, 36, 308619, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='supportticket',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 11, 7, 50, 36, 306619, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 11, 7, 50, 36, 306619, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='latitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, null=True, verbose_name='Широта'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='longtitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, null=True, verbose_name='Долгота'),
        ),
        migrations.AlterField(
            model_name='ticketaudit',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 11, 7, 50, 36, 306619, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='ticketaudit',
            name='latitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, null=True, verbose_name='Широта'),
        ),
        migrations.AlterField(
            model_name='ticketaudit',
            name='longtitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, null=True, verbose_name='Долгота'),
        ),
    ]
