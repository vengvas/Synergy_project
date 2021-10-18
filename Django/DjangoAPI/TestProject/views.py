from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.db.models import ProtectedError
from .models import Group, User
from .serializers import GroupSerializer, UserSerializer


@csrf_exempt
def user_api(request, pk=0):
    if request.method == 'GET':
        users = User.objects.all()
        user_serializer = UserSerializer(users, many=True)
        return JsonResponse(user_serializer.data, safe=False)

    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Added Successfully!", safe=False)
        return JsonResponse("Failed to Add!", safe=False)
    
    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        user = User.objects.get(id=user_data['id'])
        user_serializer = UserSerializer(user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Updated Successfully!", safe=False)
        return JsonResponse("Failed to Update!", safe=False)

    elif request.method == 'DELETE':
        user = User.objects.get(id=pk)
        user.delete()
        return JsonResponse("Deleted Successfully!", safe=False)


@csrf_exempt
def group_api(request, pk=0):
    if request.method == 'GET':
        groups = Group.objects.all()
        group_serializer = GroupSerializer(groups, many=True)
        return JsonResponse(group_serializer.data, safe=False)

    elif request.method == 'POST':
        group_data = JSONParser().parse(request)
        group_serializer = GroupSerializer(data=group_data)
        if group_serializer.is_valid():
            group_serializer.save()
            return JsonResponse("Added Successfully!", safe=False)
        return JsonResponse("Failed to Add!", safe=False)

    elif request.method == 'PUT':
        group_data = JSONParser().parse(request)
        group = Group.objects.get(id=group_data['id'])
        group_serializer = GroupSerializer(group, data=group_data)
        if group_serializer.is_valid():
            group_serializer.save()
            return JsonResponse("Updated Successfully!", safe=False)
        return JsonResponse("Failed to Update!", safe=False)

    elif request.method == 'DELETE':
        group = Group.objects.get(id=pk)
        try:
            group.delete()
            return JsonResponse("Deleted Successfully!", safe=False)
        except ProtectedError:
            return JsonResponse("Failed to Update!"
                                " At least 1 member already consists!", safe=False)