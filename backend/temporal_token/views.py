from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
import requests
import random

from .models import TemporalToken, TokenTransaction
from django.contrib.auth.models import User

# Create your views here.


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def generate_token(request):
    user: User = request.user
    if user:
        user_token = TemporalToken.generate_token(user)
        return Response(
            {
                "temporal_token": user_token.number,
                "token_creation": user_token.creation_date,
            },
            status=status.HTTP_201_CREATED,
        )
    return Response(
        {"message": "Not Authenticated User"}, status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_tokenized_transaction(request):
    user: User = request.user
    request_token_number = request.data.get("token_number", None)
    if request_token_number:
        current_user_token = TemporalToken.get_user_lastest_token(user)
        if current_user_token == None:
            return Response(
                {"message": "No active tokens"}, status=status.HTTP_400_BAD_REQUEST
            )
        if current_user_token.number == request_token_number:
            response = requests.get("https://api.imgflip.com/get_memes")
            response_dict = response.json()
            try:
                memes = response_dict["data"]["memes"]
                meme_url = memes[random.randint(0, len(memes) - 1)]["url"]
                TokenTransaction.objects.create(
                    token=current_user_token, transaction_url=meme_url
                )
                return Response(
                    {"message": "Transaction successfull", "image_url": meme_url},
                    status=status.HTTP_201_CREATED,
                )
            except Exception as e:
                return Response(
                    {"message": "Couldn't process transaction"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

        return Response(
            {"message": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST
        )
    return Response({"message": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)
