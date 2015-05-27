(function() {

"use strict";

var taClient = null;

/******Integration Code********/
function loadTradeoffAnalytics(profile/*string or object*/, themeName/*string*/, callback/*function*/, errCallback/*function*/) {
	var options = {
			dilemmaServiceUrl : '/dilemma',
			customCssUrl : "http://ta-cdn.mybluemix.net/modmt/styles/" + themeName + ".css",
//			customCssUrl: "http://{this url}/advanced/themes/custom.css",
			profile: profile,
//			iframe: false,
//			username: "user",
//			password: "pass",
			errCallback: errCallback
		};
	taClient = new TradeoffAnalytics(options, "taWidgetContainer");
	showLoading(true);
	taClient.start(callback);
}

function showTradeoffAnalyticsWidget(problem/*object*/) {
	taClient.show(problem, onResultsReady, onResultSelection);
}

function onResultsReady() {
	showLoading(false);
	// $('.analyze').show();
	// $('.loading').hide();
	// showResults();
	resizeToParent();
	// onPageReady();
	// jumpTo('#taWidgetContainer');
}

function onResultSelection(selection) {
	// onRestore();
	// if (selection) {
	// 	$('.decisionArea').show();
	// 	$('.decisionText').text(selection.name);
	// 	jumpTo('.decisionArea');
	// } else {
	// 	$('.decisionText').text('');
	// 	$('.decisionArea').hide();
	// }
}

function destroyTradeoffAnalyticsWidget(callback/*function*/){
	taClient.destroy(function(){
		taClient = null;
		callback && callback();
	});
}

function resizeToParent() {
	taClient.resize();
}

function resizeToWindow() {
	taClient.resize( window.innerWidth, window.innerHeight);
}

function onPageReady() {
	// $('.analyze').show();
	// $('.loading').hide();
	loadSelectedProblem();
}

function initialLoad() {
	var profile = {
		optionHighlighting : false,
		favorites : false,
		favoritesTab : false,
		optionDetails : true,
		filters : true,
		filterHistogram : false,
		objectivesOnly : true,
		zoomIn : false,
		optimalsList : false,
		autoExcludedList : false,
		incompleteList : false,
		tradeoffAnalyzer: false,
		undoRedo : false,
		exploreViz : "map",
		questionEditor : "editableNoToggle"
	};

	loadTradeoffAnalytics(profile, 'watson', onPageReady, onError);

	// loadProfile('basic');
	// loadTheme('watson');
}

function onError(error) {
	var errorMsg = 'Error processing the request.';
	console.error(errorMsg);

	byId("vizDiv").style.display = 'none';
	showLoading(false);
	afterError(error);
}

/******Application specific code ***************************/

function loadSelectedProblem() {
	var path = "problems/finance.json";

	byId("errorDiv").style.display = "none";
	byId("featuresArea").style.display = "none";
	byId("themeArea").style.display = "none";
	//	byId("vizDiv").style.display = "none";
	// byId("vizDiv").style.visibility= 'hidden';
	// byId("vizDiv").style.position= 'absolute';
	byId("decisionDiv").style.display = "none";
		xhr(path, "GET", {}, undefined, function(txt) {
			onInputJsonChanged(txt);
		}, afterError);

}

function onInputJsonChanged(txt) {
	try {
		var problem = JSON.parse(txt);
		assert(problem, "Empty Problem");
		assert(Array.isArray(problem.columns), "Invalid problem columns");
		assert(Array.isArray(problem.options), "Invalid problem options");

		// recreateWidgetIfNeeded(function(){
			showTradeoffAnalyticsWidget(problem);
		// });
	}
	catch(err) {
		afterError("JSON parsing error: " + err);
	}
}

function afterError() {
	var errText = arguments[0];
	if (arguments[0].responseText) {
		errText+= "\n" + arguments[0].responseText;
	}

	byId("errorText").textContent = errText;
	byId("errorDiv").style.display = "block";
	jump("errorDiv");
}

function restore() {
	window.onkeyup = null;
	removeClass(byId("taWidgetContainer"), "fullsize");
	removeClass(document.documentElement, "noScroll");
	resizeToParent();
	jump("vizDiv");
}

// function loadProfile(profileName) {
// 	xhr("advanced/profiles/" +profileName, "GET", {}, undefined, function(txt) {
// 		byId("featuresText").value = txt;
// 	}, afterError);
// }
//
// function loadTheme(themeName) {
// 	xhr("advanced/themes/" +themeName + ".less", "GET", {}, undefined, function(txt) {
// 		byId("themeText").value = txt;
// 	}, afterError);
// }

function showLoading(doShow) {
	var node = byId('taLoadingOverlay');
	if (doShow) {
		removeClass(node, 'stopped');
		removeClass(node, 'hidden');
	} else {
		node.addEventListener('transitionend', function() {
			// transition has finished, so now hide the node so it is no longer
			// overlaying the TA widget
			addClass(node, 'hidden');
		});
		addClass(node, 'stopped');
	}
}

window.addEventListener("error", afterError);
window.addEventListener("load", initialLoad);

})();
