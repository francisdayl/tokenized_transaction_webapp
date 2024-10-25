from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token

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
    request_transaction_url = request.data.get("transaction_url", None)
    print(request_token_number, request_transaction_url)
    if request_token_number and request_transaction_url:
        current_user_token = TemporalToken.get_user_lastest_token(user)
        if current_user_token == None:
            return Response(
                {"message": "No active tokens"}, status=status.HTTP_400_BAD_REQUEST
            )
        if current_user_token.number == request_token_number:
            TokenTransaction.objects.create(
                token=current_user_token, transaction_url=request_transaction_url
            )
            return Response(
                {"message": "Transaction successfull"}, status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST
        )
    return Response({"message": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)
