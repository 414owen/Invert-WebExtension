console.log("Page Inverter Loaded");
const reg = /invert\(\d*%\)/;
let haveInverted = false;
let inverted = false;
const container = document.createElement("div");
const style = container.style;

browser.runtime.onMessage.addListener(() => {
	const newVal = "invert(" + (inverted ? 0 : 100) + "%)";

	if (!haveInverted) {
		haveInverted = true;
		const body = document.body;
		const div = document.createElement("div");
		const els = [];
		while (body.firstChild) {
			els.push(body.firstChild);
			body.removeChild(body.firstChild);
		}
		els.forEach((el) => {
			div.appendChild(el);
		});
		const bstyle = document.body.style;
		div.style.filter = "invert(0%)";
		if (bstyle.backgroundColor !== "") {
			div.style.backgroundColor = bstyle.backgroundColor;
		} else {
			div.style.backgroundColor = "#fff";
		}
		container.appendChild(div);
		body.appendChild(container);
	}
	
	if (style.filter === "") {
		console.log("inserting");
		style.filter = newVal;
	} else if (reg.test(style.filter)) {
		console.log("replacing");
		style.filter = style.filter.replace(reg, newVal);
	} else {
		console.log("appending");
		style.filter = style.filter + " " + newVal;
	}

	inverted = !inverted;
});
