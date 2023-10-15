FROM php:8.2-apache

# Install system dependencies required for Composer
RUN apt-get update \
    && apt-get install -y sudo \
    && apt-get install -y git \
    && apt-get install -y zip \
    && apt-get install -y unzip

# installing additional PHP extensions using 'docker-php-ext-install' followed by the name of the extension
RUN docker-php-ext-install pdo_mysql mysqli

# get latest Composer
COPY --from=composer:2.6.5 /usr/bin/composer /usr/bin/composer

# create system user ("usr" with uid 1000) 
RUN useradd -G www-data,root -u 1000 -d /home/usr usr
RUN mkdir -p /home/usr/ && chown -R usr:usr /home/usr

# copy existing application directory permissions
COPY --chown=usr:usr . /var/www/html

# copy Apache virtual host
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

# enabling Apache mod rewrite
RUN a2enmod rewrite

# copy Apache virtual host
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

# changing user 
USER usr

# going to app' directory inside container
WORKDIR /var/www/html

# installing Composer deps, the vendor folder will only be populated inside the container
# RUN composer install

# running Apache
CMD apache2-foreground
