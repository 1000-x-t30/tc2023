FROM atsu666/acms:8.1

RUN apt-get update && apt-get install -y \
  supervisor \
  cron \
  vim \
  && rm -rf /var/lib/apt/lists/*

ENV EDITOR vim
RUN update-alternatives --set editor /usr/bin/vim.basic

COPY ./docker-compose.d/etc/cron.d/cron /etc/cron.d/cron

RUN chmod +x /etc/cron.d/cron