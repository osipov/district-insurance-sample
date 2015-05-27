'use strict';
/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * if VCAP_SERVICES exists then it returns
 * username, password and url
 * for the first service that stars with 'name' or {} otherwise
 * @param  String name, service name
 * @return {Object} the service credentials or {} if
 * name is not found in VCAP_SERVICES
 */
module.exports.getServiceCreds = function(name) {
    if (process.env.VCAP_SERVICES) {
        var services;
        try {
            services = JSON.parse(process.env.VCAP_SERVICES);
        } catch(e) {
            console.error('ERROR: Error parsing JSON value of VCAP_SERVICES: ' + e);
            console.error('       VCAP_SERVICES = ' + process.env.VCAP_SERVICES);
            return;
        }

        var found = false;
        for (var service_name in services) {
            if (service_name.indexOf(name) === 0) {
                found = true;
                try {
                    var service = services[service_name][0];
                    var creds = {
                        url: service.credentials.url,
                        username: service.credentials.username,
                        password: service.credentials.password
                    };
                    return creds;
                } catch(e) {
                    console.error('ERROR: Credentials for "' + name + '" not in expected structure');
                    console.error('    VCAP_SERVICES = ' + process.env.VCAP_SERVICES);
                }
            }
        }

        if (!found) {
            console.error('ERROR: "' + name + '" not found in VCAP_SERVICES');
            console.error('       VCAP_SERVICES = ' + process.env.VCAP_SERVICES);
        }
    } else {
        console.error('ERROR: VCAP_SERVICES not defined in environment');
    }
    return {};
};
