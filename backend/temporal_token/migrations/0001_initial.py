# Generated by Django 5.1.2 on 2024-10-25 05:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="TemporalToken",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("creation_date", models.DateTimeField(auto_now_add=True)),
                ("number", models.CharField(max_length=6)),
                (
                    "owner",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Token Owner",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="TokenTransaction",
            fields=[
                ("id", models.UUIDField(primary_key=True, serialize=False)),
                ("transaction_date", models.DateTimeField(auto_now_add=True)),
                ("transaction_url", models.TextField()),
                (
                    "token",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="temporal_token.temporaltoken",
                        verbose_name="Token",
                    ),
                ),
            ],
        ),
    ]
