# Generated by Django 3.2.9 on 2022-03-12 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapview', '0002_alter_airquality_dtime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='airquality',
            name='dtime',
            field=models.CharField(max_length=25),
        ),
    ]
