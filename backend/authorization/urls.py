from django.urls import path
from .views import register_user, login_user, validate_user

urlpatterns = [
    path("register/", register_user, name="register"),
    path("login/", login_user, name="login"),
    path("validate/", validate_user, name="validate"),
]
