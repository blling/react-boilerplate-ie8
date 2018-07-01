FROM node:10.1.0-alpine

RUN mkdir /root/mockserver

COPY . /root/mockserver/
COPY mockserver-entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/mockserver-entrypoint.sh

EXPOSE 12000

ENTRYPOINT ["mockserver-entrypoint.sh"]
CMD []