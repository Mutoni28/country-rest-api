
const queryString = window.location.search;


const urlParams = new URLSearchParams(queryString);

// using countries unique cc to get a selected country URL


if (urlParams.has("cc")) {
	countryCode = urlParams.get("cc");
}

let data = JSON.parse(localStorage.getItem("getCountries")) || "";
if (data == "") {
	fetch("https://restcountries.com/v3.1/all")
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			data = res;
			localStorage.setItem("getCountries", JSON.stringify(data));
			renderMoreData();
		});
} else {
	renderMoreData();
}

function renderMoreData() {
	const flag = document.querySelector("#flag");
	const name = document.querySelector("#name");
	const nativeName = document.querySelector("#nativeName");
	const population = document.querySelector("#population");
	const region = document.querySelector("#region");
	const subRegion = document.querySelector("#subRegion");
	const capital = document.querySelector("#capital");
	const currencies = document.querySelector("#currencies");
	const languages = document.querySelector("#languages");
	const borderCountries = document.querySelector("#borderCountries");

	const country = data.find((item) => {
		return item.cca3 == countryCode;
	});
	console.log(country);
	
	flag.setAttribute("src", country.flags.svg);

	name.innerHTML = country.name.common;

	nativeName.innerHTML = country.name.official;

	population.innerHTML = country.population.toLocaleString("en-US");

	region.innerHTML = country.region;

	subRegion.innerHTML = country.subregion;

	capital.innerHTML = country.capital;


	currencies.innerHTML = Object.keys(country.currencies)
		.map((item) => country.currencies[item].name)
		.join(", ");

	languages.innerHTML = Object.keys(country.languages)
		.map((item) => country.languages[item])
		.join(", ");

	country.borders.map((item) => {
		const borderCountry = data.find((ele) => {
			return ele.cca3 == item;
		});
		borderCountries.innerHTML += `
        <a class=" btnFill" href="/About/country.html?cc=${borderCountry.cca3}">${borderCountry.name.common}</a>
        `;
	});

}

