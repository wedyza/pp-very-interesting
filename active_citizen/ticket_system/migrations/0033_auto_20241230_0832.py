# Generated by Django 3.2 on 2024-12-30 03:32

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('ticket_system', '0032_auto_20241224_1753'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 30, 3, 32, 57, 976231, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='notification',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 30, 3, 32, 57, 979226, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='review',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 30, 3, 32, 57, 979226, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='subcategory',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 30, 3, 32, 57, 976231, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='supportticket',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 30, 3, 32, 57, 976231, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 30, 3, 32, 57, 976231, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='ticketaudit',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 30, 3, 32, 57, 976231, tzinfo=utc), verbose_name='Создано'),
        ),
    ]
