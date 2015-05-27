# Licensed under the Apache License. See footer for details.
IMAGE_DEFAULT := district-insurance-sample

#uncomment and specify Container Service defaults below
#REGISTRY_DEFAULT := 
#IP_DEFAULT := 

#uncomment and specify Tradeoff Analytics Service defaults below
#TA_URL := 
#TA_USER := 
#TA_PASS := 

CF_API_URL_DEFAULT := https://api.ng.bluemix.net
CONTAINER_SERVICE_NAME_DEFAULT := interconnect-container-service
TRADEOFF_SERVICE_NAME_DEFAULT := interconnect-tradeoff-service

TA_URL_DEFAULT := https://gateway.watsonplatform.net/tradeoff-analytics-beta/api
VCAP_SERVICES = '{ "tradeoff_analytics": [{ "name": "interconnect-tradeoff-service", "label": "tradeoff_analytics", "plan": "free", "credentials": { "url": "$(TA_URL)", "username": "$(TA_USER)", "password": "$(TA_PASS)" } }] }'
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
