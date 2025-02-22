# Generated by Django 3.2 on 2024-12-14 16:45

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ticket_system', '0027_auto_20241214_2102'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 14, 16, 45, 56, 749270, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AddField(
            model_name='category',
            name='created_by',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='users.customabstractuser'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='subcategory',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 14, 16, 45, 56, 749270, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AddField(
            model_name='subcategory',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='users.customabstractuser'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='notification',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 14, 16, 45, 56, 751270, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='review',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 14, 16, 45, 56, 752269, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='supportticket',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 14, 16, 45, 56, 749270, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 14, 16, 45, 56, 749270, tzinfo=utc), verbose_name='Создано'),
        ),
        migrations.AlterField(
            model_name='ticketaudit',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 14, 16, 45, 56, 749270, tzinfo=utc), verbose_name='Создано'),
        ),
    ]
