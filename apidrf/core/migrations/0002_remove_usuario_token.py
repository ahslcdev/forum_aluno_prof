# Generated by Django 3.2.8 on 2021-11-30 22:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuario',
            name='token',
        ),
    ]
