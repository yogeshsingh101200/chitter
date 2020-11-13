from django.urls import path, re_path
from .views import index

urlpatterns = [
    path('', index),
    path('login', index),
    path('register', index),
    re_path('^user/.*', index)
]
