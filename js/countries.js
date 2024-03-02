let countries = []
const countriesBody = document.getElementById("countries")
let themeMode = "light"



const continents1 = document.getElementById("continent-filter-item1")
const continents2 = document.getElementById("continent-filter-item2")
const continents3 = document.getElementById("continent-filter-item3")
const continents4 = document.getElementById("continent-filter-item4")
const continents5 = document.getElementById("continent-filter-item5")
const continents6 = document.getElementById("continent-filter-item6")
const continents7 = document.getElementById("continent-filter-item7")
const continents8 = document.getElementById("continent-filter-item8")


const filterContinent = document.getElementById("filter-continent")



function searchContinent() {
    const x = document.getElementById("continent-filt")
    const img = document.getElementById("filter-chevron")
    if (x.style.display == "none") {
        x.style.display = "block"
        img.style.rotate = "-90deg"
    } else {
        x.style.display = "none"
        img.style.rotate = "0deg"
    }
}

const searchCountries = document.getElementById("searching")
searchCountries.addEventListener("input", searchCountryByName)

function searchCountryByName(event) {
    const text = event.target.value
    const filteredCountry = countries.filter(el => el.name.common.toLowerCase().includes(text))
    countriesBody.innerHTML = '';
    console.log(filteredCountry)
    if (filteredCountry.length === 0) {
        fillCountryBodyToEmpty(0)
    }
    for (const country of filteredCountry) {
        fillCountryBody(country)
    }
}

function fillCountryBodyToEmpty(e) {
    if (e === 0) {
        const newItem = document.createElement("div")
        newItem.textContent = "Mavjud davlatlar ro'yhatidan topilmadi!"
        newItem.className = "nothing"
        countriesBody.appendChild(newItem)
    } else {
        countriesBody.innerHTML = '';
        for (const country of countries) {
            fillCountryBody(country)
        }
    }
}



function fillCountryByContinent(continent) {
    const continentText = continent.textContent
    const filteredContinent = countries.filter(cont => cont.continents.includes(continentText))
    countriesBody.innerHTML = ''
    console.log(filteredContinent)
    for (const conti of filteredContinent) {
        fillCountryBody(conti)
    }
}


continents1.addEventListener("click", () => {
    filterContinent.textContent = continents1.textContent
    fillCountryByContinent(filterContinent)
})
continents2.addEventListener("click", () => {
    filterContinent.textContent = continents2.textContent
    fillCountryByContinent(filterContinent)
})
continents3.addEventListener("click", () => {
    filterContinent.textContent = continents3.textContent
    fillCountryByContinent(filterContinent)
})
continents4.addEventListener("click", () => {
    filterContinent.textContent = continents4.textContent
    fillCountryByContinent(filterContinent)
})
continents5.addEventListener("click", () => {
    filterContinent.textContent = continents5.textContent
    fillCountryByContinent(filterContinent)
})
continents6.addEventListener("click", () => {
    filterContinent.textContent = continents6.textContent
    fillCountryByContinent(filterContinent)
})
continents7.addEventListener("click", () => {
    filterContinent.textContent = continents7.textContent
    fillCountryByContinent(filterContinent)
})
continents8.addEventListener("click", () => {
    filterContinent.textContent = "Filter by Continent"
    countriesBody.innerHTML = '';
    for (const country of countries) {
        fillCountryBody(country)
    }
})

const countrContinent = document.getElementById("countryContinent")
const countrCapital = document.getElementById("countryCapital")


function toChildRoute(child) {
    localStorage.setItem("theme", themeMode)
    localStorage.setItem("country", JSON.stringify(child))
    window.location.href = "country-detail.html"
}

function fillCountryBody(country) {
    const newItem = document.createElement("div")
    newItem.className = "countries-item"
    newItem.onclick = () => {
        toChildRoute(country)
    }
    
    countriesBody.appendChild(newItem)

    const countimg = document.createElement("img")
    countimg.className = 'country-flag'
    countimg.src = country.flags.svg
    newItem.appendChild(countimg)


    const newCountryNameDiv = document.createElement("div")
    newCountryNameDiv.className = 'country-name'
    newItem.appendChild(newCountryNameDiv)

    const textName = document.createTextNode("Country Name: ");

    const countryNameText = document.createElement("h5")
    countryNameText.className = 'country-name-text'
    countryNameText.appendChild(textName)
    newCountryNameDiv.appendChild(countryNameText)

    const countryName = document.createElement("p")
    countryName.className = 'countryName'
    countryName.textContent = country.name.common
    newCountryNameDiv.appendChild(countryName)



    const newCountryPopDiv = document.createElement("div")
    newCountryPopDiv.className = 'country-population'
    newItem.appendChild(newCountryPopDiv)

    const textPop = document.createTextNode("Population: ");

    const countryPopText = document.createElement("h5")
    countryPopText.className = 'country-pop-text'
    countryPopText.appendChild(textPop)
    newCountryPopDiv.appendChild(countryPopText)

    const countryPopulation = document.createElement("p")
    countryPopulation.className = 'countryPopulat'
    countryPopulation.textContent = country.population
    newCountryPopDiv.appendChild(countryPopulation)


    const newCountryContinentDiv = document.createElement("div")
    newCountryContinentDiv.className = 'country-continent'
    newItem.appendChild(newCountryContinentDiv)

    const textContinent = document.createTextNode("Continent: ");

    const countryContinentText = document.createElement("h5")
    countryContinentText.className = 'country-continent-text'
    countryContinentText.appendChild(textContinent)
    newCountryContinentDiv.appendChild(countryContinentText)

    const countryContinent = document.createElement("p")
    countryContinent.className = 'countryContinent'
    countryContinent.textContent = country.continents
    newCountryContinentDiv.appendChild(countryContinent)



    const newCountryCapitalDiv = document.createElement("div")
    newCountryCapitalDiv.className = 'country-capital'
    newItem.appendChild(newCountryCapitalDiv)

    const textCapital = document.createTextNode("Capital: ");

    const countryCapitalText = document.createElement("h5")
    countryCapitalText.className = 'country-capital-text'
    countryCapitalText.appendChild(textCapital)
    newCountryCapitalDiv.appendChild(countryCapitalText)

    const countryCapital = document.createElement("p")
    countryCapital.className = 'countryCapital'
    countryCapital.textContent = country.capital
    newCountryCapitalDiv.appendChild(countryCapital)
}
async function countriesInfo() {
    const url = `https://restcountries.com/v3.1/all`
    const response = await fetch(url)
    countries = await response.json()
    console.log(countries)
    await countries.sort(function (a, b) {
        if (a.name.common < b.name.common) {
            return -1;
        }
        if (a.name.common > b.name.common) {
            return 1;
        }
        return 0;
    });
    for (const country of countries) {
        fillCountryBody(country)
    }
}

countriesInfo()


const modeImage = document.getElementById("mode-image")
const filtrChevron = document.getElementById("filter-chevron")
const pageModeText = document.getElementById("darkMode")

themeMode = localStorage.getItem("theme")
document.body.className = themeMode;
modeImage.src = themeMode === "dark" ? "/img/icons8-sun-64.png" : "/img/icons8-moon-50.png"
pageModeText.textContent = themeMode === "dark" ? "Light Mode" : "Dark Mode"
modeImage.style.width = "50px"
function modePage() {
    if (document.body.className == "dark") {
        document.body.className = ""
        modeImage.src = "/img/icons8-moon-50.png"
        themeMode = "light"
        pageModeText.textContent = "Dark Mode"
        localStorage.setItem("theme", themeMode)
    }
    else {
        document.body.className = "dark"
        modeImage.src = "/img/icons8-sun-64.png"
        modeImage.style.width = "50px"
        themeMode = "dark"
        pageModeText.textContent = "Light Mode"
        localStorage.setItem("theme", themeMode)
    }
}



const searchTrash = document.getElementById("search-trash")

searchTrash.addEventListener("click", () => {
    searchCountries.value = ''
    fillCountryBodyToEmpty(1)
    // console.log(searchCountries.value)
})
