from rest_framework import serializers
from .models import User, Group


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',
                  'name',
                  'group',
                  'date')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id',
                  'name',
                  'description')
