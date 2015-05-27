/*******************************************************************************
 * IBM Confidential
 *
 * Licensed Materials - Property of IBM
 *
 *
 *
 * © Copyright IBM Corp. 2014 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *******************************************************************************/

if (!('forEach' in Array.prototype)) {
	Array.prototype.forEach = function(action, that /*opt*/) {
		for (var i = 0, n = this.length; i < n; i++)
			if ( i in this)
				action.call(that, this[i], i, this);
	};
}
if (!('map' in Array.prototype)) {
	Array.prototype.map = function(mapper, that /*opt*/) {
		var other = new Array(this.length);
		for (var i = 0, n = this.length; i < n; i++)
			if ( i in this)
				other[i] = mapper.call(that, this[i], i, this);
		return other;
	};
}
if (!('filter' in Array.prototype)) {
	Array.prototype.filter = function(filter, that /*opt*/) {
		var other = [], v;
		for (var i = 0, n = this.length; i < n; i++)
			if ( i in this && filter.call(that, v = this[i], i, this))
				other.push(v);
		return other;
	};
}
function assert(cond, message){
	if(!cond){
		throw message;
	}
}
function byId(id) {
	return document.getElementById(id);
}
function xhr(url, method, headers, body, okCallback, errCallback) {
	[okCallback, errCallback].forEach(function(f){
		if(typeof(f)!="function"){
			throw "invalid callback function";
		}
	});
	var xmlhttp = new XMLHttpRequest();
//	xmlhttp.onload = okCallback;
//	xmlhttp.onerror = errCallback;
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				okCallback(xmlhttp.responseText);
			} else {
				errCallback("{status}-{statusText}\n{responseText}".formatAll(xmlhttp));
			}
		}
	};
	xmlhttp.open(method, url, true);
	for ( var att in headers) {
		xmlhttp.setRequestHeader(att, headers[att]);
	}
	xmlhttp.send(body);
}

String.prototype.formatAll = function(map){
	var res = this;
	for(var key in map){
		res = res.replace('{'+key+'}', map[key]);
	}
	return res;
};
function createDom(elem, map, parent){
	var e= document.createElement(elem);
	for(var k in map){
		e[k] = map[k];
	}
	if(parent){
		parent.appendChild(e);
	}
	return e;
}
function hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

function jump(h){
	var top = document.getElementById(h).offsetTop; //Getting Y of target element
	window.scrollTo(0, top);                        //Go there.
}

function selectNav() {
	var navElement = document.querySelector('#appNav a[href^="/' + location.pathname.split("/")[1] + '"]');
	addClass(navElement, "active");
}

window.addEventListener("load", selectNav);
