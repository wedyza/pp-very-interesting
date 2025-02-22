# Generated by Django 3.2 on 2024-12-03 10:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ticket_system', '0008_ticket_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='source',
        ),
        migrations.RemoveField(
            model_name='notification',
            name='text',
        ),
        migrations.AddField(
            model_name='notification',
            name='status_code_on_change',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='ticket_system.statuscode'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='ticket',
            name='address',
            field=models.CharField(max_length=100, null=True, verbose_name='Адрес проблемы'),
        ),
    ]
