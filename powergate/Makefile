down:
	docker-compose \
		-f docker-compose.yaml \
		-f ipfs-image.yaml \
		-f powergate-image.yaml \
		down
	docker-compose -p localnet \
		-f docker-compose-localnet.yaml \
		-f ipfs-image.yaml \
		-f powergate-image.yaml \
		down
.PHONY: down

up: down
	docker-compose \
		-f docker-compose.yaml \
		-f ipfs-image.yaml \
		-f powergate-image.yaml \
		up --build 
.PHONY: up

localnet: 
	docker-compose -p localnet \
		-f docker-compose-localnet.yaml \
		-f ipfs-image.yaml \
		-f powergate-image.yaml \
		up --build -V
.PHONY: localnet
