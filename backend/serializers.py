from rest_framework import serializers
from .models import User, Post, Like, Connection
from django.contrib.auth import authenticate


class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = "__all__"
        read_only_fields = ["user"]

    def validate(self, attrs):
        user = self.context["request"].user
        if user == attrs["follows"]:
            raise serializers.ValidationError("A user can't follow itself!")
        return attrs


class UserSerializer(serializers.ModelSerializer):
    followers = ConnectionSerializer(many=True, read_only=True)
    followers_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "followers",
                  "followers_count", "following_count"]

    def get_followers_count(self, user):
        return user.followers.count()

    def get_following_count(self, user):
        return user.following.count()


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwagrs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"], password=validated_data["password"])
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials!")


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["content"]


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"


class PublicPostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    like_count = serializers.SerializerMethodField(read_only=True)
    likes = LikeSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ["id", "content", "author",
                  "created_at", "like_count", "likes"]

    def get_like_count(self, post):
        return post.likes.count()
