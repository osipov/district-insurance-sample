# Licensed under the Apache License. See footer for details.
include scripts/SETTINGS.mk
include scripts/build/interactive.bluemix.mk

push:
	#-cf ic tag -f $(IMAGE) $(REGISTRY)/$(IMAGE)
	#-cf ic push $(REGISTRY)/$(IMAGE)

rerun:
	-cf ic stop $(IMAGE)
	-cf ic ip unbind $(IP) $(IMAGE)
	-cf ic rm $(IMAGE)
	sleep 10
	#ice run --name $(IMAGE) --bind NOOP $(REGISTRY)/$(IMAGE) --publish 80
	cf ic run --name $(REGISTRY)/$(IMAGE)
	sleep 10
	cf ic ip bind $(IP) $(IMAGE)
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
