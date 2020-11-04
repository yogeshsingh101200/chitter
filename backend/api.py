from .models import Post, Like, Connection
from .serializers import RegisterSerializer, LoginSerializer
from .serializers import UserSerializer, PostSerializer, LikeSerializer, ConnectionSerializer
from .serializers import PublicPostSerializer
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from knox.models import AuthToken


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


class PublicPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = PublicPostSerializer


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
        permissions.AllowAny
    ]
    serializer_class = LikeSerializer


class ConnectionViewSet(viewsets.ModelViewSet):
    queryset = Connection.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ConnectionSerializer
