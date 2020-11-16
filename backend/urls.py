from rest_framework import routers
from .api import RegisterAPI, LoginAPI, UserAPI, FollowingAPI
from .api import PostViewSet, LikeViewSet, ConnectionViewSet, PublicPostViewSet, UserViewSet
from django.urls import path, include
from knox import views as knox_views

router = routers.DefaultRouter(trailing_slash=False)
router.register("api/auth/posts", PostViewSet, "posts")
router.register("api/posts", PublicPostViewSet, "public_posts")
router.register("api/auth/likes", LikeViewSet, "likes")
router.register("api/users", UserViewSet, "user")
router.register("api/auth/connections", ConnectionViewSet, "connections")

urlpatterns = [
    path("", include(router.urls)),
    path("api/auth", include("knox.urls")),
    path("api/auth/register", RegisterAPI.as_view()),
    path("api/auth/login", LoginAPI.as_view()),
    path("api/auth/logout", knox_views.LogoutView.as_view()),
    path("api/auth/user", UserAPI.as_view()),
    path("api/auth/following/posts", FollowingAPI.as_view()),
]
