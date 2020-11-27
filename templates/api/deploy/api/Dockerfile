FROM python:3.7-buster

LABEL maintainer="contact@caleydo.org"
WORKDIR /phovea

ENV PHOVEA_ENV=production
ENV PHOVEA_SERVICE=api

# default path in WORKDIR (= /phovea/config.json)
ENV PHOVEA_CONFIG_PATH=config.json

# secrets
ENV REDIS_USERNAME=admin
ENV REDIS_PASSWORD=admin

ENV MONGO_USERNAME=admin
ENV MONGO_PASSWORD=admin

RUN printf "deb http://deb.debian.org/debian/ buster main\ndeb-src http://deb.debian.org/debian/ buster main\ndeb http://deb.debian.org/debian-security/ buster/updates main\ndeb-src http://deb.debian.org/debian-security/ buster/updates main" > /etc/apt/sources.list

# install dependencies last step such that everything before can be cached
COPY requirements*.txt docker_packages.txt docker_script*.sh _docker_data* ./
RUN (!(test -s docker_packages.txt) || (apt-get update && \
    (cat docker_packages.txt | xargs apt-get install -y))) && \
    (pip install --no-cache-dir -r requirements.txt)
RUN (!(test -s docker_script.sh) || (bash ./docker_script.sh))

COPY ./build/source ./

# establish the runtime user
RUN useradd -l -M -U -s /bin/bash phovea && \
    chown -R phovea:phovea /phovea && \
    echo '{}' > /phovea/config.json && \
    chmod a+rw /phovea/config.json && \
    chmod -R a+rw /tmp/
USER phovea

# Create separate launch file (similar to phovea_server/__main__.py from repository root), because it is not included in build files
RUN printf "from phovea_server import launch\nlaunch.run()\n" > /phovea/launch.py

EXPOSE 9000

CMD printenv && \
    cat ${PHOVEA_CONFIG_PATH} > /tmp/config.json && \
    sed -i -e "s/REDIS_USERNAME/${REDIS_USERNAME}/g" /tmp/config.json && \
    sed -i -e "s/REDIS_PASSWORD/${REDIS_PASSWORD}/g" /tmp/config.json && \
    sed -i -e "s/MONGO_USERNAME/${MONGO_USERNAME}/g" /tmp/config.json && \
    sed -i -e "s/MONGO_PASSWORD/${MONGO_PASSWORD}/g" /tmp/config.json && \
    export PHOVEA_CONFIG_PATH=/tmp/config.json && \
    python launch.py --env ${PHOVEA_ENV} ${PHOVEA_SERVICE}
