include scripts/SETTINGS.mk

build:
	cp scripts/build/Dockerfile .
	cp scripts/build/.dockerignore .
	docker build -t $(IMAGE) .

build-local:
	cp scripts/build/Dockerfile .
	cp scripts/build/.dockerignore .
	docker build -t $(IMAGE) .

rerun:
	@make -j 1 -f scripts/build/bluemix.mk push rerun

rerun-devops:
	@make -j 1 -f scripts/build/bluemix.mk rerun

rerun-local:
	@make -j 1 -f scripts/build/local.mk
