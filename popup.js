let inverted = false;
const body = document.body;
const ff = navigator.userAgent.indexOf("Firefox") != -1;
const api = (ff ? browser : chrome);

const sides = ["one", "two"].map((id) => {
	return document.getElementById(id);
});

sides.push(body);
sides.forEach((el) => {
	[
		["padding", "0"],
		["margin", "0"],
		["border", "0"],
		["display", "inline-block"],
		["overflow", "hidden"]
	].forEach((s) => {
		el.style[s[0]] = s[1];
	});
});

function col(a) {
	for (var i = 0; i < (ff ? 3 : 2); i++) {
		sides[i].style.backgroundColor = a[i] || a[i - 1];
	}
}

const col1 = col.bind(null, ["#fff", "#000"]);
const col2 = col.bind(null, ["#000", "#fff"]);
col1();

for (var i = 0; i < 2; i++) {
	body.appendChild(sides[i]);
}

function callback(tab) {
	api.tabs.sendMessage(tab[0].id, inverted);
}

body.onclick = function() {
	(inverted ? col1 : col2)();
	inverted = !inverted;
	const getTab = api.tabs.query({active: true, currentWindow: true}, (ff ? undefined : callback));
	if (ff) {getTab.then(callback);}
}
