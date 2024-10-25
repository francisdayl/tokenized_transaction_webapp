from django.urls import path
from .views import generate_token, save_tokenized_transaction

urlpatterns = [
    path("generate_token/", generate_token, name="generate_token"),
    path(
        "save_tokenized_transaction/",
        save_tokenized_transaction,
        name="save_tokenized_transaction",
    ),
]
