# Generated by Django 3.2 on 2024-11-14 15:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ticket_system', '0002_auto_20241114_1933'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='TicketType',
            new_name='Category',
        ),
        migrations.RenameField(
            model_name='supportticket',
            old_name='ticket_type',
            new_name='category',
        ),
        migrations.RenameField(
            model_name='ticket',
            old_name='ticket_type',
            new_name='category',
        ),
    ]
