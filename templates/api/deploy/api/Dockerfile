FROM python:3.10-buster
LABEL maintainer="contact@datavisyn.io"

WORKDIR /phovea

ENV PYTHONUNBUFFERED=1
ENV ENV=production
ENV PHOVEA_CONFIG_PATH=/phovea/config.json

# install dependencies last step such that everything before can be cached
COPY requirements.txt .
RUN apt-get update && pip install --no-cache-dir -r /phovea/requirements.txt

COPY ./build/source ./

CMD ["python", "-m", "uvicorn", "tdp_core.server.main:app", "--host", "0.0.0.0", "--port", "80"]

EXPOSE 80
