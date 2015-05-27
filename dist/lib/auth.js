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
var Users = require('../models/users')(),
    LocalStrategy = require('passport-local').Strategy;

exports.config = function (settings) {};

// Injects the user object into the response.
exports.injectUser = function() {
    return function injectUser(req, res, next) {
        if (req.isAuthenticated()) {
            res.locals.user = req.user;
        }
        next();
    };
};

// Enforce authentication on protected urls.
exports.isAuthenticated = function (role) {
    return function (req, res, next) {
        // TODO: Public urls not requiring authentication, should be in config.
        var noauth = {
            '/login': true,
            '/': true
        };
        var route = req.url;

        // If route is public, don't enforce authentication.
        if (noauth[route]) {
            next();
            return;
        }

        // If accessing secure page, but not authenticated, save requested
        // location and redirect to /login.
        if (!req.isAuthenticated()) {
            req.session.goingTo = req.url;
            res.redirect('/login');
            return;
        }

        // Passed auth checks so continue.
        next();
    };
};

exports.localStrategy = function () {
    return new LocalStrategy(function (username, password, done) {
        // Check if the user exists
        Users.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }

            // Verify user exists and password valid.
            if (!user || !user.checkPassword(password)) {
                return done(null, false, { message: 'Invalid username or password' });
            }

            done(null, user);
        });
    });
};
