# from django.db import models
from django.contrib.gis.db import models
# Create your models here.


class Airquality(models.Model):
    dtime = models.CharField(max_length=25)
    #dtime = models.BigIntegerField()
    lat = models.FloatField()
    lng = models.FloatField()
    pm10 = models.FloatField()
    pm2_5 = models.FloatField()
    temp = models.FloatField()
    hum = models.FloatField()

    def __str__(self):
        return f"{self.lat, self.lng}"
