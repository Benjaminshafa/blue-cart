FROM node:10
#
ARG DT_API_URL="https://vyq02360.live.dynatrace.com/api"
ARG DT_API_TOKEN="iq2-DNBgQfaNp6R1F2v6q"
ARG DT_ONEAGENT_OPTIONS="flavor=default"
ENV DT_HOME="/opt/dynatrace/oneagent"
RUN mkdir -p "$DT_HOME" && \
    wget -O "$DT_HOME/oneagent.zip" "$DT_API_URL/v1/deployment/installer/agent/unix/paas/latest?Api-Token=$DT_API_TOKEN&$DT_ONEAGENT_OPTIONS" && \
    unzip -d "$DT_HOME" "$DT_HOME/oneagent.zip" && \
    rm "$DT_HOME/oneagent.zip"
#
WORKDIR /usr/src/app

COPY src/package*.json ./

RUN npm install

COPY ./src .

EXPOSE 3000

ENTRYPOINT [ "/opt/dynatrace/oneagent/dynatrace-agent64.sh" ]

CMD [ "node", "server.js" ]