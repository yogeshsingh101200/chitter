from .models import Post, Like, Connection, User
from .serializers import RegisterSerializer, LoginSerializer
from .serializers import UserSerializer, PostSerializer, LikeSerializer, ConnectionSerializer, ReadableConnectionSerializer
from .serializers import PublicPostSerializer
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.pagination import LimitOffsetPagination
import operator


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class FollowingPostAPI(generics.ListAPIView):
    pagination_class = LimitOffsetPagination
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = PublicPostSerializer

    def get_queryset(self):
        queryset = []
        for record in Connection.objects.filter(user=self.request.user):
            queryset += list(record.follows.posts.all())
        return sorted(queryset, key=operator.attrgetter("created_at"), reverse=True)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

    def get_queryset(self):
        username = self.request.query_params.get('username', None)
        queryset = []
        if username is not None:
            queryset = User.objects.filter(username=username)
        return queryset


class PublicPostViewSet(viewsets.ReadOnlyModelViewSet):
    pagination_class = LimitOffsetPagination
    queryset = Post.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = PublicPostSerializer

    def get_queryset(self):
        queryset = Post.objects.all().order_by("-created_at")
        author = self.request.query_params.get("author", None)
        if author is not None:
            queryset = Post.objects.filter(
                author=author).order_by("-created_at")
        return queryset


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = PostSerializer

    def get_queryset(self):
        return self.request.user.posts.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = LikeSerializer


class ConnectionViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ConnectionSerializer

    def get_queryset(self):
        return Connection.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FollowingAPI(generics.ListAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = ReadableConnectionSerializer

    def get_queryset(self):
        queryset = []
        username = self.request.query_params.get("username", None)
        if username is not None:
            queryset = User.objects.get(username=username).following.all()
        return queryset


class FollowerAPI(generics.ListAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = ReadableConnectionSerializer

    def get_queryset(self):
        queryset = []
        username = self.request.query_params.get("username", None)
        if username is not None:
            queryset = User.objects.get(username=username).followers.all()
        return queryset
