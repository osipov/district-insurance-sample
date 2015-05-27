# Licensed under the Apache License. See footer for details.
#prompt for tradeoff analytics if undefined and revert to default if not provided
ifndef TA_URL
export TA_URL := $(shell read -p "Tradeoff Analytics Service API endpoint [$(TA_URL_DEFAULT)]: " tmp; echo $${tmp:-'$(TA_URL_DEFAULT)'})
endif

#prompt for tradeoff analytics username and unset the variable (failure condition) if not provided
ifndef TA_USER
export TA_USER := $(shell read -p "Tradeoff Analytics Service username: " tmp; echo $$tmp)
endif
ifeq "$(strip $(TA_USER))" ""                
undefine TA_USER                        
endif                                                   
ifndef TA_USER  
$(error Tradeoff Analytics service username is not set)                     
endif


#prompt for tradeoff analytics password and unset the variable (failure condition) if not provided
ifndef TA_PASS
export TA_PASS := $(shell read -p "Tradeoff Analytics Service password: " tmp; echo $$tmp) 
endif                                   
ifeq "$(strip $(TA_PASS))" ""
undefine TA_PASS
endif
ifndef TA_PASS                                                                  
$(error Tradeoff Analytics service password is not set)                         
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
