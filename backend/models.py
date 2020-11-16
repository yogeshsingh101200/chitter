from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    pass


class Post(models.Model):
    content = models.CharField(max_length=250)
    author = models.ForeignKey(
        User, related_name="posts", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(default=timezone.now, blank=True)

    def __str__(self):
        return f"{self.author}: {self.content}"


class Like(models.Model):
    by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="likes")
    on = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="likes")

    class Meta:
        unique_together = ["by", "on"]


class Connection(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="following")
    follows = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="followers")

    class Meta:
        unique_together = ["user", "follows"]
