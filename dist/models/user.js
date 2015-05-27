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
var UserModel = function(data) {
    data = data || {};

    this.id = data.id || '';
    this.username = data.username || '';
    this.email = data.email || '';
    this.displayName = data.displayName || data.firstName + ' ' +
            data.lastName || '';
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.fullName = (data.firstName && data.lastName) ? data.firstName + ' ' +
            data.lastName : data.displayName;
    this.password = data.password;
    if (data.picURL) {
        this.picURL = String(data.picURL);
    }
};

UserModel.prototype = {
    checkPassword: function(passwd) {
        return passwd === this.password;
    }
};

module.exports = UserModel;
