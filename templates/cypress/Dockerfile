FROM node:16.17.0-buster 

WORKDIR /etc/frontend
COPY ./ ./

ENV CYPRESS_host="https://ordino-daily.caleydoapp.org/"
ENV CYPRESS_API_URL=http://localhost:1234
ENV APP=ordino_public
ENV KEY=XXX

# to suppress ERROR:gpu_memory_buffer_support_x11.cc(44)] dri3 extension not supported.
ENV ELECTRON_EXTRA_LAUNCH_ARGS=--disable-gpu

# to suppress tput: No value for $TERM and no -T specified
ENV TERM=xterm

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

RUN npx cypress install

RUN node ./symlink_frontend_repos.js 

CMD ["sh", "-c", "cd ./${APP} && npx cy2 run --parallel --record --key ${KEY} --config projectId=${APP} --ci-build-id ${APP}-`date +%s`"]