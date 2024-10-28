import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .tasks import generate_token


class TokenConsumer(WebsocketConsumer):
    def connect(self):
        if not self.scope["user"].is_authenticated:
            self.close()
            return

        self.accept()

        # Start token generation
        print(self.scope["user"])
        generate_token.delay(self.scope["user"].id, self.channel_name)

    def disconnect(self, close_code):
        pass

    def token_message(self, event):
        # Send token to WebSocket
        self.send(
            text_data=json.dumps(
                {
                    "temporal_token": event["temporal_token"],
                    "token_creation": event["token_creation"],
                }
            )
        )
