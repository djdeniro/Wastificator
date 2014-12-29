// ==UserScript==
// @name        Wastificator
// @namespace   cr.u2m.wastificator
// @require 	styles.js
// @include     *
// @version     2
// @grant       none
//
// @author      Ilgiz Mustaifn (ilgimustafin@gmail.com)
// ==/UserScript==

var state = {
	currentTextarea : null,
	useVal : null,
}

var elements = {
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
	ta.parentNode.insertBefore(elements.button, ta.nextSibling);
}

function onAnyElementFocused(evt) {
	var target = evt.srcElement || evt.originalTarget;
	if (target
			&& (target.nodeName.toUpperCase() == 'TEXTAREA' || (target.contentEditable === 'true'))) {
		if (state.currentTextarea != target) {
			attachToTextarea(target);
		}
	}
}

function onKeyPress(evt) {
	if (state.currentTextarea && (evt.altKey && evt.key == 'w')) {
	}
}

// http://stackoverflow.com/a/16752864/3818513
function getPos(ele) {
	var x = 0;
	var y = 0;
	while (true) {
		x += ele.offsetLeft;
		y += ele.offsetTop;
		if (ele.offsetParent === null) {
			break;
		}
		ele = ele.offsetParent;
	}
	return [ x, y ];
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

function initMenu(evt) {
	var tg = evt.target;
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
	elements.button.parentNode.insertBefore(elements.contextMenu,
			elements.button.nextSibling);
	var p = getPos(elements.button);
	// elements.contextMenu.style.left = p[0] + "px";
	// elements.contextMenu.style.top = p[1] + "px";
	// elements.contextMenu.style.zIndex = 999; // TODO: h
	elements.contextMenu.style.display = "block";
}

function closeContextMenu() {
	elements.contextMenu.style.display = "none";
}

function init() {

	elements.button = document.createElement('button');
	elements.button.innerHTML = "N";

	elements.button.addEventListener("click", buttonClicked, true);

	elements.contextMenu = document.createElement("div");
	elements.contextMenu.style.border = "solid 1px red";
	// elements.contextMenu.style.position = "absolute";
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

	document.addEventListener('focus', onAnyElementFocused, true);
	window.addEventListener('keypress', onKeyPress, true);
}

init();
