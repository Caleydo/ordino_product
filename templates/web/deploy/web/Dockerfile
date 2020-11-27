FROM nginx:1.17-alpine

LABEL maintainer="contact@caleydo.org"

ENV PHOVEA_API_SERVER=api
ENV PHOVEA_NGINX_PORT=8080

COPY ./deploy/web/nginx.conf /etc/nginx/nginx.conf
COPY ./deploy/web/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY ./bundles /usr/share/nginx/html

RUN touch /var/run/nginx.pid && \
  adduser -D -H -u 1000 -s /bin/bash www-data -G www-data && \
  chown -R www-data:www-data /var/run/nginx.pid && \
  chown -R www-data:www-data /var/cache/nginx && \
  chown -R www-data:www-data /var/log/nginx && \
  chmod -R a+rw /etc/nginx/ && chmod -R a+rw /tmp/

USER www-data

EXPOSE 8080

CMD cat /etc/nginx/conf.d/default.conf > /tmp/default.conf && \
    sed -i -e "s/PHOVEA_API_SERVER/${PHOVEA_API_SERVER}/g" /tmp/default.conf && \
    sed -i -e "s/PHOVEA_NGINX_PORT/${PHOVEA_NGINX_PORT}/g" /tmp/default.conf && \
    cat /tmp/default.conf && \
    cat /tmp/default.conf > /etc/nginx/conf.d/default.conf && \
    nginx -g 'daemon off;'
