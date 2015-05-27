# Licensed under the Apache License. See footer for details.
#FROM node 
FROM registry-ice.ng.bluemix.net/ibmnode:latest

RUN mkdir /hellonode

# Move the package.json and npm.install into a seperate
# layer to optimize the build process.
ADD dist/package.json /hellonode/package.json
RUN cd /hellonode && npm install -d --production

COPY dist /hellonode/

EXPOSE 80
CMD ["node", "/hellonode/server.js"]
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
