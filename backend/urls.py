from rest_framework import routers
from .api import RegisterAPI, LoginAPI, UserAPI
from .api import PostViewSet
from django.urls import path, include
from knox import views as knox_views

router = routers.DefaultRouter(trailing_slash=False)
router.register("api/posts", PostViewSet, "posts")

urlpatterns = [
    path("", include(router.urls)),
    path("api/auth", include("knox.urls")),
    path("api/auth/register", RegisterAPI.as_view()),
    path("api/auth/login", LoginAPI.as_view()),
    path("api/auth/logout", knox_views.LogoutView.as_view()),
    path("api/auth/user", UserAPI.as_view())
]
