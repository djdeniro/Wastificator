// ==UserScript==
// @name        Wastificator
// @namespace   cr.u2m.wastificator
// @include     *
// @version     1
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

var consts = {
	prefix : "wastifcator-"
}

var wastificationStyles = {
	"ps1" : {
		replaces : {
			'А' : 'A',
			'Б' : '6',
			'В' : 'B',
			'Г' : '7',
			'Д' : 'D',
			'Е' : 'E',
			'Ё' : 'E',
			'Ж' : 'X',
			'З' : '3',
			'И' : 'N',
			'Й' : 'N',
			'К' : 'K',
			'Л' : 'JI',
			'М' : 'M',
			'Н' : 'H',
			'О' : '0',
			'П' : 'II',
			'Р' : 'P',
			'С' : 'C',
			'Т' : 'T',
			'У' : 'Y',
			'Ф' : '9P',
			'Х' : 'X',
			'Ц' : 'U',
			'Ч' : '4',
			'Ш' : 'W',
			'Щ' : 'W',
			'Ь' : 'b',
			'Ы' : 'bI',
			'Ъ' : 'b',
			'Э' : '3',
			'Ю' : 'I0',
			'Я' : '9'
		},
		getWastified : function(s) {
			var ans = "";
			var rep = this.replaces;
			for (var i = 0; i < s.length; i++) {
				var c = s[i];
				var upperC = c.toUpperCase();
				if (rep[upperC] === null || rep[upperC] === undefined) {
					ans += c;
				} else {
					ans += rep[upperC];
				}
			}
			return ans;
		}
	},
	"vc" : {
		replaces : {
			'м' : "m",
			"п" : "n",
			"и" : "u",
			"й" : "u",
			"д" : "g"
		},
		getWastified : function(s) {
			var ans = "";
			var rep = this.replaces;
			for (var i = 0; i < s.length; i++) {
				var c = s[i];
				if (rep[c] === null || rep[c] === undefined) {
					ans += c;
				} else {
					ans += rep[c];
				}
			}
			return ans;
		}
	},
	"sa_caps" : {
		replaces : {
			"Э" : "3",
			"Щ" : "Ш",
			"Ъ" : "Ь",
			"S" : "Ы",
			"R" : "Я",
			"Ё" : "Е",
			"Й" : "И"
		},
		getWastified : function(s) {
			var ans = "";
			var rep = this.replaces;
			for (var i = 0; i < s.length; i++) {
				var c = s[i].toUpperCase();
				if (rep[c] === null || rep[c] === undefined) {
					ans += c;
				} else {
					ans += rep[c];
				}
			}
			return ans;
		}
	}

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
	var style = wastificationStyles[styleName];
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

	state.activeStyle = "vc";

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
	for ( var prop in wastificationStyles) {
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
