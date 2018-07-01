FROM httpd:2.4.33-alpine

COPY ./apache2/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./apache2/extra/httpd-vhosts.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf

COPY ./dist /usr/local/apache2/htdocs/