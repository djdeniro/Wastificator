// ==UserScript==
// @name        Wastificator
// @namespace   cr.u2m.wastificator
// @require 	styles.js
// @include     *
// @version     3.2.1
// @grant       none
//
// @author      Ilgiz Mustaifn (ilgimustafin@gmail.com)
// ==/UserScript==

var state = {
	currentTextarea : null,
	useVal : null,
}

var elements = {
	div : null,
	button : null,
	contextMenu : null,
}

function attachToTextarea(ta) {
	state.currentTextarea = ta;
	if (ta.value === null || ta.value === undefined) {
		state.useVal = false;
	} else {
		state.useVal = true;
	}
	ta.parentNode.insertBefore(elements.div, ta.nextSibling);
}

function onAnyElementFocused(evt) {
	var target = evt.srcElement || evt.originalTarget;
	if (target
			&& (target.nodeName.toUpperCase() == 'TEXTAREA' || target.contentEditable === 'true')) {
		if (state.currentTextarea != target) {
			attachToTextarea(target);
		}
	}
}

function wastifyTextarea(ta, styleName) {
	var style = styles[styleName];
	var val = "";
	if (state.useVal) {
		val = ta.value;
	} else {
		val = ta.innerHTML;
	}
	var ans = style.getWastified(val);
	if (state.useVal) {
		ta.value = ans;
	} else {
		ta.innerHTML = ans;
	}
}

function buttonClicked(evt) {
	console.log(elements.contextMenu);
	if (elements.contextMenu.style.display != "none") {
		closeContextMenu();
	} else {
		showContextMenu();
	}
}

function styleClicked(evt) {
	var target = evt.srcElement || evt.originalTarget;
	wastifyTextarea(state.currentTextarea, target.textContent);
	closeContextMenu();
}

function showContextMenu() {
	elements.contextMenu.style.display = "inline-block";
}

function closeContextMenu() {
	elements.contextMenu.style.display = "none";
}

function init() {
	console.log("WASTIFICATOR IS STARTING...");

	elements.div = document.createElement('div');
	elements.div.style.display = "block";
	console.log("yaya");
	
	elements.button = document.createElement('button');
	elements.button.innerHTML = "W";
	elements.button.addEventListener("click", buttonClicked, true);

	elements.div.appendChild(elements.button);
	elements.div.appendChild(document.createElement("br"));
	
	elements.contextMenu = document.createElement("div");
	elements.contextMenu.style.border = "solid 1px red";
	elements.contextMenu.style.display = "none";
	elements.contextMenu.style.backgroundColor = "white";
	elements.contextMenu.style.padding = "0px";
	elements.contextMenu.style.margin = "0px";
	var styleList = document.createElement("ol");
	for ( var prop in styles) {
		var entry = document.createElement("li");
		var link = document.createElement("a");
		link.style.cursor = "pointer";
		link.style.color = "blue";
		link.appendChild(document.createTextNode(prop));
		link.addEventListener("click", styleClicked, true);
		entry.appendChild(link);
		styleList.appendChild(entry);
	}
	elements.contextMenu.appendChild(styleList);

	elements.div.appendChild(elements.contextMenu);
	
	document.addEventListener('focus', onAnyElementFocused, true);
	
	console.log("WASTIFICATOR INIT COMPLETE!");
}

init();
