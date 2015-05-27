# Licensed under the Apache License. See footer for details.
ifeq ($(origin IMAGE), undefined)
export IMAGE := $(shell read -p "Image [$(IMAGE_DEFAULT)]: " tmp; echo $${tmp:-'$(IMAGE_DEFAULT)'})	
endif
ifeq ($(origin REGISTRY), undefined)
export REGISTRY := $(shell read -p "Registry [$(REGISTRY_DEFAULT)]: " tmp2; echo $${tmp2:-'$(REGISTRY_DEFAULT)'})
endif
ifeq ($(origin IP), undefined)
export IP := $(shell read -p "IP [$(IP_DEFAULT)]: " tmp3; echo $${tmp3:-'$(IP_DEFAULT)'})
endif
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
