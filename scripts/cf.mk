# Licensed under the Apache License. See footer for details.
include scripts/SETTINGS.mk
ifeq ($(origin CF_API_URL), undefined)
export CF_API_URL := $(shell read -p "Cloud Foundry API endpoint [$(CF_API_URL_DEFAULT)]: " tmp3; echo $${tmp3:-'$(CF_API_URL_DEFAULT)'})
endif

.login-cf:
	cf login -a $(CF_API_URL)
	touch .login-cf

.deploy-cf:
	mkdir -p tmp
	touch tmp/tmp
	-cf push NOOP -p tmp  -i 1 -d mybluemix.net -k 1M -m 64M --no-hostname --no-manifest --no-route --no-start
	rm -r tmp/tmp
	rm -r tmp
	-cf create-service tradeoff_analytics standard $(TRADEOFF_SERVICE_NAME_DEFAULT)
	-cf bind-service NOOP $(TRADEOFF_SERVICE_NAME_DEFAULT)
#	-cf restage NOOP
	touch .deploy-cf

.interactive-deploy-warn:
	@echo Before proceeding, make sure to delete any existing instances of the container and tradeoff analytics services in the organization where you are logged on to Bluemix.
	@read -p "Press any key to continue."  blah

.interactive-deploy-cf: .login-cf .interactive-deploy-warn .deploy-cf
	@cf env NOOP
	@echo Note the Tradeoff Analytics password and username above and copy/paste them when prompted
	@read -p "Press any key to continue."  blah
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
