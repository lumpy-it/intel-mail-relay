FROM node:8.4
MAINTAINER Lunedis

WORKDIR /opt/intel-mail-relay

RUN apt-get update && apt-get install -y cron

COPY package.json package-lock.json ./

RUN npm install

COPY crontab /etc/cron.d/intel-mail-relay
RUN chmod 0644 /etc/cron.d/intel-mail-relay

COPY . .

RUN npm run build

RUN chmod +x /opt/intel-mail-relay/cron.sh
RUN touch /var/log/cron.log

CMD cron && tail -f /var/log/cron.log
