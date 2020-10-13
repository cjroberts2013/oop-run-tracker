// Run Class
class Run {
	constructor(distance, pace, time) {
		this.distance = distance;
		this.pace = pace;
		this.time = time;
	}
}

// UI Class
class UI {
	static displayRuns() {
		const runs = Store.getRuns();

		runs.forEach((run) => UI.addRunToList(run));
	}

	static addRunToList(run) {
		const list = document.querySelector("#run-list");

		const row = document.createElement("tr");

		row.innerHTML = `
            <td>${run.distance}</td>
            <td>${run.pace}</td>
            <td>${run.time}</td>
            <td class='flex justify-end'><a href='#' class='bg-red white dib f6 link dim br1 ph3 pv2 mb2 tr delete'>X</a></td>
        `;

		list.appendChild(row);
	}

	static deleteRun(el) {
		if (el.classList.contains("delete")) {
			el.parentElement.parentElement.remove();
		}
	}

	static showAlert(message, className) {
		const div = document.createElement("div");

		if (className === "danger") {
			div.className =
				"alert tc flex justify-center ba br2 pa2 ma4 mb2 dib red bg-washed-red";
		} else {
			div.className =
				"alert tc flex justify-center ba br2 pa2 ma4 mb2 dib green bg-washed-green";
		}
		div.appendChild(document.createTextNode(message));

		const container = document.querySelector(".container");

		const form = document.querySelector("#run-form");

		container.insertBefore(div, form);

		// Disappear after 3 seconds
		setTimeout(() => document.querySelector(".alert").remove(), 3000);
	}
}

// Store Class: Handles Storage
class Store {
	static getRuns() {
		let runs;
		if (localStorage.getItem("runs") === null) {
			runs = [];
		} else {
			runs = JSON.parse(localStorage.getItem("runs"));
		}

		return runs;
	}

	static addRun(run) {
		const runs = Store.getRuns();

		runs.push(run);

		localStorage.setItem("runs", JSON.stringify(runs));
	}

	static removeRun(time) {
		const runs = Store.getRuns();

		runs.forEach((run, index) => {
			if (run.time === time) {
				runs.splice(index, 1);
			}
		});

		localStorage.setItem("runs", JSON.stringify(runs));
	}
}

// Display Runs
document.addEventListener("DOMContentLoaded", UI.displayRuns);

// Add Run
document.querySelector("#run-form").addEventListener("submit", (e) => {
	e.preventDefault();

	const distance = document.querySelector("#distance").value;
	const pace = document.querySelector("#pace").value;
	const time = document.querySelector("#time").value;

	const run = new Run(distance, pace, time);

	UI.addRunToList(run);

	Store.addRun(run);

	// Clear Input Fields
	document.getElementById("run-form").reset();

	UI.showAlert("Run Added!", "success");
});

// Remove Run
document.querySelector("#run-list").addEventListener("click", (e) => {
	UI.deleteRun(e.target);

	Store.removeRun(e.target.parentElement.previousElementSibling.textContent);

	UI.showAlert("Run Removed", "danger");
});
