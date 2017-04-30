let inverted = false;
const body = document.body;

const sides = ["one", "two"].map((id) => {
	return document.getElementById(id);
});

sides.push(body);
sides.forEach((el) => {
	[
		["padding", "0"],
		["margin", "0"],
		["border", "0"],
		["overflow", "hidden"]
	].forEach((s) => {
		el.style[s[0]] = s[1];
	});
});

function col(a) {
	for (var i = 0; i < 3; i++) {
		sides[i].style.backgroundColor = a[i] || a[i - 1];
	}
}

const col1 = col.bind(null, ["#fff", "#000"]);
const col2 = col.bind(null, ["#000", "#fff"]);
col1();

for (var i = 0; i < 2; i++) {
	body.appendChild(sides[i]);
}

body.onclick = function() {
	console.log("Inverting", inverted);
	(inverted ? col1 : col2)();
	inverted = !inverted;
	const getTab = browser.tabs.query({active: true, currentWindow: true});
	getTab.then((tab) => {
		browser.tabs.sendMessage(tab[0].id, inverted);
	});
}
