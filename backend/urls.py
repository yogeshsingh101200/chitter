from rest_framework import routers
from .api import UserViewSet, PostViewSet, LikeViewSet, ConnectionViewSet

router = routers.DefaultRouter()
router.register('api/users', UserViewSet, 'users')

urlpatterns = router.urls
