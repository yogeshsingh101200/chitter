from rest_framework import serializers
from .models import User, Post, Like, Connection


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password",
                  "followers_count", "following_count"]


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"


class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = "__all__"
