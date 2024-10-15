FROM node:18.20.4-alpine3.19 as base

RUN apk add --update make gcc python3 g++ py3-pip
RUN npm i -g node-gyp

WORKDIR /src

RUN --mount=type=bind,source=package.json,target=package.json \
    yarn install --network-timeout 100000 # --verbose

FROM base as builder

WORKDIR /src

ARG NEXT_TELEMETRY_DISABLED=1
ARG NEXT_APP_BUILD_ENV
ARG NEXT_APP_HOST_DOMAIN
ARG NEXT_APP_GA_MEASUREMENT_ID
ARG NEXT_APP_WALLETCONNECT_PROJECT_ID
ARG NEXT_APP_TEST_MODE
ARG NEXT_APP_CONTRACT_ADDRESS
ARG NEXT_APP_MODULE_NAME
ARG NEXT_APP_SPIN_API_URL
ARG NEXT_APP_SPIN_API_PATH_PREFIX
ARG NEXT_APP_APTOS_NODIT_KEY

ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

COPY . .

RUN --mount=type=cache,target=/root/.yarn  \
    yarn next build


FROM scratch as exporter

COPY --from=builder /src/build /

FROM node:18.20.4-alpine3.19 as web

WORKDIR /build

RUN yarn global add serve

COPY --from=builder /src/build .

CMD ["serve", "-s", ".", "-l", "3000"]
