# Licensed under the Apache License. See footer for details.
#THIS IS NOT A STANDALONE MAKEFILE
#USE ../..//Makefile TO BUILD THE SERVICE
include SETTINGS.mk
include scripts/build/interactive.mk

all:
	@echo $(IMAGE) $(REGISTRY) $(IP)
	cp scripts/build/Dockerfile .
	cp scripts/build/.dockerignore . 
	-ice --local build -t $(IMAGE) .
	-ice --local tag -f $(IMAGE) $(REGISTRY)$(IMAGE)

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
