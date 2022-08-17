FROM node:14.17-buster

WORKDIR /etc/frontend/
COPY ./ /etc/frontend/

ENV CYPRESS_HOST="https://ordino-daily.caleydoapp.org/"

RUN apt-get install          
# https://docs.cypress.io/guides/continuous-integration/introduction#Dependencies 
RUN apt-get update && apt-get install -y \
  libgtk2.0-0 \
  libgtk-3-0 \
  libgbm-dev \
  libnotify-dev \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  xvfb

RUN npm install cy2
RUN node ./symlink_frontend_repos.js
RUN npx cypress run --env host=$CYPRESS_HOST