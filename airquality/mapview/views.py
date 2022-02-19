from .models import Airquality
from .serializers import AirqualitySerializer
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.
# model viewsets


class ModelViewset(viewsets.ModelViewSet):
    serializer_class = AirqualitySerializer
    queryset = Airquality.objects.all()
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]

# testData = {
#     "max": 8,
#     "data": [
#       {
#         "pm2.5": 50,
#         "pm10": 110,
#         "track_seg_point_id": 0,
#         "ele": 989.1,
#         "lng": 83.985686666666661,
#         "lat": 28.233123333333331

#       },
#       {
#         "pm2.5": 51,
#         "pm10": 110,
#         "track_seg_point_id": 1,
#         "ele": 989.1,
#         "lng": 83.975686666666661,
#         "lat": 28.253121666666669
#       },
#       {
#         "pm2.5": 52,
#         "pm10": 110,
#         "track_seg_point_id": 2,
#         "ele": 988.7,
#         "lng": 83.965688333333352,
#         "lat": 28.243125
#       },
#       {
#         "pm2.5": 51,
#         "pm10": 110,
#         "track_seg_point_id": 3,
#         "ele": 988.7,
#         "lng": 83.975688333333352,
#         "lat": 28.263125
#       },
#     ]
#   };

'''
# generic viewsets


class GenericViewset(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    serializer_class = AirqualitySerializer
    queryset = Airquality.objects.all()

# generics and mixins api views


class GenericAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    serializer_class = AirqualitySerializer
    queryset = Airquality.objects.all()
    lookup_field = 'id'
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)cd
        else:
            return self.list(request)

    def post(self, request):
        return self.create(request)

    def put(self, request, id=None):
        return self.update(request, id)

    def delete(self, request, id=None):
        return self.destroy(request, id)


# class based views


@permission_classes((permissions.AllowAny,))
class AirqualityAPIView(APIView):
    def get(self, request):
        airquality = Airquality.objects.all()
        serializer = AirqualitySerializer(airquality, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AirqualitySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes((permissions.AllowAny,))
class AirqualityDetails(APIView):
    def get_object(self, id):
        try:
            return Airquality.objects.get(id=id)

        except Airquality.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        airqualit = self.get_object(id)
        serializer = AirqualitySerializer(airqualit)
        return Response(serializer.data)

    def put(self, request, id):
        airqualit = self.get_object(id)
        serializer = AirqualitySerializer(airqualit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        airqualit = self.get_object(id)
        airqualit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# function based views (currently not in use)


@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def airquality_list(request):

    if request.method == 'GET':
        airquality = Airquality.objects.all()
        serializer = AirqualitySerializer(airquality, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AirqualitySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((permissions.AllowAny,))
def airquality_detail(request, pk):
    try:
        airqualit = Airquality.objects.get(pk=pk)

    except Airquality.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AirqualitySerializer(airqualit)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AirqualitySerializer(airqualit, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        airqualit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

''' 