
const filterSwitch = document.querySelector(".filterSelect");

const filterOptionBox = document.querySelector(".filterOptions");

const filterOptions = document.querySelectorAll(".option");


filterSwitch.addEventListener("click", () => {
	filterOptionBox.classList.toggle("hidden");
});

filterOptions.forEach((item) => {
	item.addEventListener("click", () => {
		if (item.innerText == "None") {
			filterSwitch.innerText = "Filter by Region";
		} else {
			filterSwitch.innerText = item.innerText;
		}
		filterOptionBox.classList.toggle("hidden");
		searchAndFilter();
	});
});

const container = document.querySelector("#countryDataContainer");
const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("input", (e) => {
	e.preventDefault();
	searchAndFilter();
});

function searchAndFilter() {
	if (filterSwitch.innerText == "Filter by Region") {
		renderData(searchInput.value);
	} else {
		renderData(searchInput.value, filterSwitch.innerText);
	}
}
//function to fetch data from countries API
let data = JSON.parse(localStorage.getItem("getCountries")) || "";

if (data == "") {
	fetch("https://restcountries.com/v3.1/all")
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			data = res;
			localStorage.setItem("getCountries", JSON.stringify(data));
			renderData();
		})
		.catch((err) => {
			console.log(err);
			container.innerHTML = "<p>NO DATA FOUND<p>";
		});
} else {
	renderData();
}

function renderData(dataRendered1 = "", dataRendered2 = "") {
	container.innerHTML = "";

	tempdata = data.filter((item) => {
		item = Object.values(item);
		item = JSON.stringify(item).toLocaleLowerCase();

	
		
		return (
			item.includes(dataRendered1.toLocaleLowerCase()) &&
			item.includes(dataRendered2.toLocaleLowerCase())
		);
	});
	tempdata.forEach((item, index) => {
		if (index < 50) {
			console.log(item);
			container.innerHTML += `
        <a class="card" href="/About/country.html?cc=${
					item.cca3
				}">
        <div class="upper">
            <img src="${item.flags.svg}" alt="flag">
        </div>
        <div class="lower">
            <h3>${item.name.common}</h3>
            <p>
            <span class="label" >Population: </span>
            <span class="labelValue" >${item.population.toLocaleString(
							"en-US"
						)}</span>
            </p>
            <p>
            <span class="label" >Region: </span>
            <span class="labelValue" >${item.region}</span>
            </p>
            <p>
            <span class="label" >Capital: </span>
            <span class="labelValue" >${item.capital}</span>
            </p>
        </div>
        </a>
          `;
		}
	});
}
