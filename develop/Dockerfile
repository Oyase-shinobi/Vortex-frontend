FROM node:18.20.4-alpine3.19 as spin-game-frontend-base

RUN apk add --update make gcc python3

WORKDIR /srv/spin-game-frontend

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    yarn install --frozen-lockfile --network-timeout 100000 # --verbose


FROM spin-game-frontend-base as spin-game-frontend-dev

WORKDIR /srv/spin-game-frontend

ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn global add serve

ENTRYPOINT []

CMD ["yarn","dev"]
