(function() {
	var activeClass = "tabActive";
	var hiddenClass = "hidden";

	function initTabs() {
		var container = document.getElementById("investmentContainer");

		// Initialize click handler for tabs
		var tabs = container.querySelectorAll("#tabs li");
		for (var i = 0, len = tabs.length; i < len; i++) {
			tabs[i].onclick = displayPage;
		}
	}

	function displayPage() {
		var current = this.parentNode.querySelector(".tabActive");

		// Deselect the tab and hide the current page
		removeClass(current, activeClass);
		var currentPage = document.getElementById(current.getAttribute("data-tab-page"));
		addClass(currentPage, hiddenClass);

		// Select the new tab and show the new page
		addClass(this, activeClass);
		var newPage = document.getElementById(this.getAttribute("data-tab-page"));
		removeClass(newPage, hiddenClass);
	}

	window.addEventListener("load", initTabs);
})();
