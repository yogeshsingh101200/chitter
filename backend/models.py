from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    followers_count = models.PositiveIntegerField(blank=True, default=0)
    following_count = models.PositiveIntegerField(blank=True, default=0)


class Post(models.Model):
    content = models.CharField(max_length=150)
    author = models.ForeignKey(
        User, related_name="posts", on_delete=models.CASCADE, null=True)


class Like(models.Model):
    by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="likes")
    on = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="likes")

    class Meta:
        unique_together = ["by", "on"]


class Connection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    follows = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="followers")
