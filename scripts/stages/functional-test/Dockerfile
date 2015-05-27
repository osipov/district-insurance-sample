# Licensed under the Apache License. See footer for details.
FROM registry-ice.ng.bluemix.net/et_demo_org/ice-pipeline-demo

RUN apt-get update \
&& apt-get install -y vim openssh-server supervisor

RUN mkdir -p /var/log/supervisor
COPY scripts/stages/functional-test/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN mkdir -p /var/run/sshd
COPY id_rsa.pub /root/.ssh/
RUN cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys
EXPOSE 22

RUN cd /hellonode && npm install
RUN cd /hellonode && npm install -g grunt-cli
RUN cd /hellonode && npm install -g node-inspector
EXPOSE 5858 8090

CMD ["/usr/bin/supervisord"]
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
