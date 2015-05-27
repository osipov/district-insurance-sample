(function() {
function initialLoad() {
	byId("inputText").value = "";
	var path = "problems/finance.json";
	xhr(path, "GET", {}, undefined, function(txt) {
		byId("inputText").value = txt;
		onInputJsonChanged();
	}, afterError);
}

function onInputJsonChanged() {
	var tableParent = byId("tablePlaceHolder");
	while (tableParent.childElementCount > 0) {
		tableParent.removeChild(tableParent.childNodes[0]);
	}
	try {
		var problem = JSON.parse(byId("inputText").value);
		assert(problem, "Empty Problem");
		assert(Array.isArray(problem.columns), "Invalid problem columns");
		assert(Array.isArray(problem.options), "Invalid problem options");

		createOptionsTable(problem, tableParent);
	}
	catch(err) {
		afterError("JSON parsing error: " + err);
	}
}

function createOptionsTable(problem, parent) {
	var table = createDom("table", {}, parent);
	var tr = createDom("tr", {}, table);
	createDom("th", {innerHTML : "Name"}, tr);
	problem.columns.forEach(function(c) {
		var th = createDom("th", {
			className : c.is_objective ? c.goal == "MIN" ? "minimize"
			: "maximize" : "info"
		}, tr);
		var iconClassName = c.is_objective ? c.goal == "MIN" ? "legendIconMin"
		: "legendIconMax" : "legendIconNone";
		createDom("span", {
			className : "legendIcon " + iconClassName
		}, th);
		createDom("span", {
			innerHTML : c.full_name
		}, th);
	});
	problem.options.forEach(function(op, i) {
		var tr = createDom("tr", {
			className : i % 2 ? 'odd' : 'even'
		}, table);
		createDom("td", {
			innerHTML : op.name
		}, tr);
		var val;
		problem.columns.forEach(function(c) {
			val = op.values[c.key] || "NA";
			createDom("td", {
				innerHTML : val
			}, tr);
		});
	});
	return table;
}

function afterError() {
	var errText = arguments[0];
	if (arguments[0].responseText) errText+= "\n" + arguments[0].responseText;

	byId("errorText").textContent = errText;
	byId("errorDiv").style.display = "block";
	jump("errorDiv");
	// readyToAnalyze();
}

window.addEventListener("error", afterError);
window.addEventListener("load", initialLoad);

})();
