from celery import shared_task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import random
import string
from django.utils import timezone
from datetime import timedelta
from .models import TemporalToken


@shared_task
def generate_token(user_id, channel_name):
    token: TemporalToken = TemporalToken.generate_token(user_id)

    # Send token through WebSocket
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.send)(
        channel_name,
        {
            "type": "token.message",
            "temporal_token": token.number,
            "token_creation": token.creation_date,
        },
    )

    # Schedule token refresh
    count_down = timezone.now() - token.creation_date
    time_limit = timedelta(seconds=60)

    generate_token.apply_async(
        args=[user_id, channel_name],
        countdown=(
            count_down if timezone.now() - token.creation_date <= time_limit else 60
        ),
    )
