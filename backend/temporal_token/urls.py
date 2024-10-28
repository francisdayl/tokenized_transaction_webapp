from django.urls import path
from .views import (
    generate_token,
    get_users_lists_token_summary,
    save_tokenized_transaction,
    get_user_tokens,
)

urlpatterns = [
    path("generate_token/", generate_token, name="generate_token"),
    path(
        "save_tokenized_transaction/",
        save_tokenized_transaction,
        name="save_tokenized_transaction",
    ),
    path(
        "get_users_lists_token_summary/",
        get_users_lists_token_summary,
        name="get_users_lists_token_summary",
    ),
    path("get_user_tokens/", get_user_tokens, name="get_user_tokens"),
]
