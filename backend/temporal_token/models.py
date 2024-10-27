from django.db import models
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
from django.utils import timezone
import uuid
import random

User = get_user_model()


class TemporalToken(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Token Owner"
    )
    creation_date = models.DateTimeField(auto_now_add=True)
    number = models.CharField(max_length=6)

    def __str__(self):
        return f"{self.owner.email} - {self.number}"

    @staticmethod
    def generate_random_number():
        random_number = "".join([str(random.randint(0, 9)) for _ in range(6)])
        return random_number

    @staticmethod
    def get_user_lastest_token(user: User):  # type: ignore
        latest_token_qs = TemporalToken.objects.filter(owner=user).order_by(
            "-creation_date"
        )
        if latest_token_qs.exists():
            latest_token: TemporalToken = latest_token_qs.first()
            if (
                latest_token.is_token_valid()
                and not TokenTransaction.objects.filter(token=latest_token).exists()
            ):
                return latest_token
        return None

    @staticmethod
    def generate_token(user: User):  # type: ignore
        latest_token = TemporalToken.get_user_lastest_token(user=user)
        if latest_token:
            return latest_token
        random_number = "".join([str(random.randint(0, 9)) for _ in range(6)])
        new_token = TemporalToken.objects.create(owner=user, number=random_number)
        return new_token

    def is_token_valid(self):
        time_limit = timedelta(seconds=60)
        return timezone.now() - self.creation_date <= time_limit


class TokenTransaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    token = models.ForeignKey(
        TemporalToken, on_delete=models.PROTECT, verbose_name="Token"
    )
    transaction_date = models.DateTimeField(auto_now_add=True)
    transaction_url = models.TextField()
