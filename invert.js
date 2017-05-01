const reg = /invert\(\d*%\)/;
let haveInverted = false;
let inverted = false;
const container = document.createElement("div");
const style = container.style;

const ff = navigator.userAgent.indexOf("Firefox") != -1;
const api = (ff ? browser : chrome);

api.runtime.onMessage.addListener(() => {
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
		style.filter = newVal;
	} else if (reg.test(style.filter)) {
		style.filter = style.filter.replace(reg, newVal);
	} else {
		style.filter = style.filter + " " + newVal;
	}

	inverted = !inverted;
});
