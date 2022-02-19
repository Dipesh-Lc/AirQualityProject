# from django.db import models
from django.contrib.gis.db import models
# Create your models here.


class Crud(models.Model):
    lat = models.FloatField()
    lng = models.FloatField()
    pm2_5 = models.FloatField()
    pm10 = models.FloatField()

    class Meta:  
        db_table = "crud" 

