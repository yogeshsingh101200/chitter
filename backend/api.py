from .models import User, Post, Like, Connection
from .serializers import UserSerializer, PostSerializer, LikeSerializer, ConnectionSerializer
from rest_framework import viewsets, permissions


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PostSerializer


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LikeSerializer


class ConnectionViewSet(viewsets.ModelViewSet):
    queryset = Connection.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ConnectionSerializer
