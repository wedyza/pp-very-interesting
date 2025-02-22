# Generated by Django 3.2 on 2024-12-24 12:53

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('ticket_system', '0031_auto_20241217_2006'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 24, 12, 53, 48, 638510, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='notification',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 24, 12, 53, 48, 644506, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='review',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 24, 12, 53, 48, 644506, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='subcategory',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 24, 12, 53, 48, 638510, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='supportticket',
            name='body',
            field=models.TextField(null=True, verbose_name='Тело'),
        ),
        migrations.AlterField(
            model_name='supportticket',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 24, 12, 53, 48, 639511, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='body',
            field=models.TextField(null=True, verbose_name='Тело'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 24, 12, 53, 48, 639511, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='ticketaudit',
            name='body',
            field=models.TextField(null=True, verbose_name='Тело'),
        ),
        migrations.AlterField(
            model_name='ticketaudit',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 24, 12, 53, 48, 639511, tzinfo=utc), verbose_name='Создано'),
        ),
    ]
