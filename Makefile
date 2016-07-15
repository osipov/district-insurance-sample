# Licensed under the Apache License. See footer for details.
NAME := district-insurance-sample
#for now, mock unique build identifiers with a random number
UUID := $(shell echo $$RANDOM)
TEST_IMAGE ?= $(NAME)-$(UUID)-test-build

include scripts/SETTINGS.mk

#Prompt for IMAGE value unless passed as command line argument
ifeq ($(origin IMAGE), undefined)
export IMAGE := $(shell read -p "Image [$(IMAGE_DEFAULT)]: " tmp; echo $${tmp:-'$(IMAGE_DEFAULT)'})
endif

build-release-local: .interactive-deploy-cf
	@make IMAGE=$(NAME) -j 1 -f scripts/build/Makefile build-local rerun-local

build-release-bluemix: .interactive-deploy-cf .setup-ics .login-ics
	@make IMAGE=$(NAME) -j 1 -f scripts/build/Makefile build rerun

build-release-bluemix-devops: .deploy-cf
	@make IMAGE=$(NAME) -j 1 -f scripts/build/Makefile build rerun

build-test-release-local:
	@echo Build delivery pipeline is not fully working yet. Use at your own risk!
	@read -p "Press any key to continue" blah
#first, run the standard build, to create the default image, but with a <uuid>-test-build postfix
	@make IMAGE=$(TEST_IMAGE) -j 1 -f scripts/stages/Makefile pipeline-local

.interactive-deploy-cf:
	@make -j 1 -f scripts/cf.mk .interactive-deploy-cf

.deploy-cf:
	@make -j 1 -f scripts/cf.mk .deploy-cf

.setup-ics:
	@echo To proceed, login to the Bluemix console and open the Container service from the dashboard. Provide a registry name and note it along with the API key. Enter it at the prompt below.
	@make -j 1 -f scripts/ics.mk .login-ics
	@echo Next, you will be shown an IP address for the demo. Note it as well. Press any key to continue.
	@read tmp
	@cf ic ip request
	@read -p "Press any key to continue" blah
	touch .setup-ics

.login-ics:
	@make -j 1 -f scripts/ics.mk .login-ics
#-------------------------------------------------------------------------------
# Copyright IBM Corp. 2015
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#-------------------------------------------------------------------------------
