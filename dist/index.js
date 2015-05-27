'use strict';

var express = require('express'),
    kraken = require('kraken-js'),
    passport = require('passport'),
    auth = require('./lib/auth'),
    user = require('./lib/user')(),
    Users = require('./models/users')();


var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */

        // Load in the demo users from config/config.json
        var demo = config.get('demo');
        Users.addUsers(demo.users);

        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));
app.on('middleware:after:session', function configPassport(eventargs) {
    passport.use(auth.localStrategy());

    passport.serializeUser(user.serialize);
    passport.deserializeUser(user.deserialize);
    app.use(passport.initialize());
    app.use(passport.session());
});
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
