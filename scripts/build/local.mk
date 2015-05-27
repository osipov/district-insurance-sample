# Licensed under the Apache License. See footer for details.
include scripts/SETTINGS.mk
include scripts/build/interactive.local.mk

rerun-local:
	ice --local run -e VCAP_SERVICES=$(VCAP_SERVICES) -p 8022:22 -p 8080:80 -p 8090:8090 -p 5858:5858 -P $(IMAGE)
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
