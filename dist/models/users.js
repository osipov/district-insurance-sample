'use strict';
var User = require('./user');
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
// The 'local' users. Should be in a database but defined in memory for now.
var users = [];

var UsersModel = function() {
    return {
        findOne: function(obj, fn) {
            var props = obj ? Object.getOwnPropertyNames(obj) : [];
            var plen = props.length;
            if (plen > 0) {
                for (var i = 0, len = users.length; i < len; i++) {
                    for (var j = 0; j < plen; j++) {
                        if (users[i][props[j]] !== obj[props[j]]) {
                            break;
                        }
                    }
                    if (j === plen) {
                        var user = new User(users[i]);
                        return fn(null, user);
                    }
                }
            }
            return fn(null, null);
        },
        addUsers: function(usersArray) {
            for (var i = 0, len = usersArray.length; i < len; i++) {
                users.push(usersArray[i]);
            }
        }
    };
};

module.exports = UsersModel;
