from django.db.models import fields
from rest_framework import serializers
from .models import Airquality


class AirqualitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Airquality
        #fields = ('location', 'pm2_5', 'pm10', 'o3', 'no2', 'so2', 'co')
        fields = '__all__'


#'''the code below does the same as above'''
# class AirqualitySerializer(serializers.Serializer):
#     lat = serializers.FloatField()
#     lng = serializers.FloatField()
#     pm2_5 = serializers.FloatField()
#     pm10 = serializers.FloatField()
#     o3 = serializers.FloatField()
#     no2 = serializers.FloatField()
#     so2 = serializers.FloatField()
#     co = serializers.FloatField()

#     def create(self, validated_data):
#         return Airquality.objects.create(validated_data)

#     def update(self, instance, validated_data):
#         instance.lat = validated_data.get('lat', instance.lat)
#         instance.lng = validated_data.get('lng', instance.lng)
#         instance.pm2_5 = validated_data.get('pm2_5', instance.pm2_5)
#         instance.pm10 = validated_data.get('pm10', instance.pm10)
#         instance.o3 = validated_data.get('o3', instance.o3)
#         instance.no2 = validated_data.get('no2', instance.no2)
#         instance.so2 = validated_data.get('so2', instance.so2)
#         instance.co = validated_data.get('co', instance.co)
#         instance.save()
#         return instance
