# Generated by Django 3.1.1 on 2020-10-15 08:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0002_auto_20201009_0752'),
    ]

    operations = [
        migrations.CreateModel(
            name='OfflineMessage',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('ruid', models.IntegerField(default=0)),
                ('mid', models.IntegerField(default=0)),
            ],
        ),
    ]
