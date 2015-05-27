pipeline-local:
	echo $(IMAGE) $(REGISTRY) $(IP)
	@make -j 1 -f scripts/build/Makefile build
	echo $(IMAGE) $(REGISTRY) $(IP)
	#todo: run keygen
	cp ~/.ssh/id_rsa.pub .
	sed 's;registry-ice.ng.bluemix.net/et_demo_org/ice-pipeline-demo;$(REGISTRY)$(IMAGE);' scripts/stages/functional-test/Dockerfile > Dockerfile
	cp scripts/stages/functional-test/.dockerignore .
	ice --local build -t $(IMAGE)-functional-test .
	ice --local tag -f $(IMAGE)-functional-test $(REGISTRY)$(IMAGE)-functional-test
	@make IMAGE=$(IMAGE)-functional-test -j 1 -f scripts/build/Makefile rerun-local
