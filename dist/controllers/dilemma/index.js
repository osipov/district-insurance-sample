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
var TradeoffAnalytics = require('../../lib/tradeoff-analytics.js'),
	bluemix = require('../../lib/bluemix.js'),
	extend = require('util')._extend;

// TODO: Hard coded defaults if not using VCAP. Should be put in config.
var credentials = bluemix.getServiceCreds('tradeoff_analytics'); // VCAP_SERVICES

function delegateRequest(req, res) {
	// Create the service wrapper
	var tradeoffAnalytics = new TradeoffAnalytics(credentials);
	tradeoffAnalytics.dilemmas(req.body, function(err, dilemmas) {
		if (err) {
			return res.status(500).json({ error: 'Error processing the request.' });
		} else {
			return res.json(dilemmas);
		}
	});
}

module.exports = function(router) {
    // notice that my route is '/' but I respond to '/dilemma' based on directory name
	router.post('/', delegateRequest);
};
