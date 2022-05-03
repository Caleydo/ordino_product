FROM python:3.10-buster

LABEL maintainer="contact@datavisyn.io"
WORKDIR /phovea

# install dependencies last step such that everything before can be cached
COPY requirements.txt /tmp/
RUN apt-get update && pip install --no-cache-dir -r /tmp/requirements.txt

COPY ./build/source ./

CMD ["python", "-m", "uvicorn", "tdp_core.server.main:app", "--host", "0.0.0.0", "--port", "9000"]

ENV ENV=production
ENV PHOVEA_CONFIG_PATH=/phovea/config.json
CMD python launch.py --env ${PHOVEA_ENV} ${PHOVEA_SERVICE}
EXPOSE 80
