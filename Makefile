CONTAINER_NAME := spin-game-aptos-frontend

## Encrypt & Decrypt
SOPS_ENV_FILE=.env.sops
SECRET_FOLDER=.secret

DOT_ENV_NAME=env
DOT_ENV=.${DOT_ENV_NAME}.${PHASE}
DOT_ENV_ENCRYPT=${PHASE}.enc.${DOT_ENV_NAME}
DOT_ENV_DECRYPT=${PHASE}.dec.${DOT_ENV_NAME}

# SOPS_ENV_CMD := command -v source >/dev/null 2>&1 && set -a && source ${SOPS_ENV_FILE} && set +a || sh ${SOPS_ENV_FILE}
SOPS_EXEC_CMD := sops --input-type dotenv --output-type dotenv

# make encrypt-dotenv PHASE=<sit,stage,production>
.PHONY: encrypt-dotenv
encrypt-dotenv:
	mkdir -p ${SECRET_FOLDER} && \
	${SOPS_EXEC_CMD} --encrypt --output ${SECRET_FOLDER}/${DOT_ENV_ENCRYPT} ${DOT_ENV}

.PHONY: decrypt-dotenv
decrypt-dotenv:
	${SOPS_EXEC_CMD} --decrypt --output ${SECRET_FOLDER}/${DOT_ENV_DECRYPT} ${SECRET_FOLDER}/${DOT_ENV_ENCRYPT}

.PHONY: encrypt-dotenv-all
encrypt-dotenv-all:
	$(MAKE) encrypt-dotenv PHASE=sit
	$(MAKE) encrypt-dotenv PHASE=stage
	$(MAKE) encrypt-dotenv PHASE=production

.PHONY: decrypt-dotenv-all
decrypt-dotenv-all:
	$(MAKE) decrypt-dotenv PHASE=sit
	$(MAKE) decrypt-dotenv PHASE=stage
	$(MAKE) decrypt-dotenv PHASE=production

## Development

.PHONY: dev
dev:
	yarn install
	yarn next telemetry disable
	yarn dev

.PHONY: start
start:
	yarn install
	yarn build
	yarn start

.PHONY: serve
serve:
	yarn next build
	serve -s build -l 3000

.PHONY: format
format:
	yarn format
	yarn lint
	yarn build

.PHONY: pre-build
pre-build:
	jq 'del(.version)' package.json > _package.json

.PHONY: dev-web-build
dev-web-build:
	$(MAKE) pre-build && \
	docker compose -f develop/compose.yaml build --force-rm $(CONTAINER_NAME)

.PHONY: dev-web-up
dev-web-up:
	export DevMode=dev && \
	docker rm -f $(CONTAINER_NAME) 2>/dev/null 1>&2 || true && \
	docker compose -f develop/compose.yaml up -d --force-recreate $(CONTAINER_NAME)
	docker logs $(CONTAINER_NAME) -f --tail=100

.PHONY: dev-web-start
dev-web-start:
	export DevMode=start && \
	docker compose -f develop/compose.yaml build --force-rm $(CONTAINER_NAME) && \
	docker rm -f $(CONTAINER_NAME) 2>/dev/null 1>&2 || true && \
	docker compose -f develop/compose.yaml up -d --force-recreate $(CONTAINER_NAME)
	docker logs $(CONTAINER_NAME) -f --tail=100

.PHONY: dev-web-serve
dev-web-serve:
	export DevMode=serve && \
	docker rm -f $(CONTAINER_NAME) 2>/dev/null 1>&2 || true && \
	docker compose -f develop/compose.yaml up -d --force-recreate $(CONTAINER_NAME)
	docker logs $(CONTAINER_NAME) -f --tail=100

.PHONY: dev-web-down
dev-web-down:
	docker rm -f $(CONTAINER_NAME)

.PHONY: dev-web-logs
dev-web-logs:
	docker logs $(CONTAINER_NAME) -f --tail=100

## Production

.PHONY: production-web-up
# make production-web-up PHASE=<sit,stage,production>
production-web-up:
	export PHASE=$$PHASE && \
	docker compose -f deploy/compose.yaml up -d --force-recreate $(CONTAINER_NAME)

.PHONY: production-web-down
production-web-down:
	export PHASE=$$PHASE && docker compose -f deploy/compose.yaml down

.PHONY: production-web-exporter
production-web-exporter:
	$(MAKE) pre-build && \
	rm -rf build && mkdir -p build && \
	docker build -f deploy/Dockerfile --target exporter --progress=plain --output type=local,dest=build .

.PHONY: production-web-build
production-web-build:
	rm -rf ./build ./_next
	mkdir -p ./build
	$(MAKE) pre-build
	docker build \
		--target exporter \
		--progress=plain \
		--output type=local,dest=$(PWD)/build \
		--file Dockerfile \
		--tag brighter/$(CONTAINER_NAME):$(PHASE) \
		.
