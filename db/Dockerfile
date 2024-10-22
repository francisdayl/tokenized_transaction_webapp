FROM mysql:8

ENV MYSQL_ROOT_PASSWORD admin
ENV MYSQL_DATABASE mydb
ENV MYSQL_USER admin
ENV MYSQL_PASSWORD admin

COPY ./data.sql /docker-entrypoint-initdb.d/data.sql