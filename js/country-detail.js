const modeImage = document.getElementById("mode-image")
const pageModeText = document.getElementById("darkMode")
const countryBorder = document.getElementById("countries-name")

let themeMode = localStorage.getItem("theme")
document.body.className = themeMode;
modeImage.src = themeMode === "dark" ? "/img/icons8-sun-64.png" : "/img/icons8-moon-50.png"
pageModeText.textContent = themeMode === "dark" ? "Light Mode" : "Dark Mode"
modeImage.style.width = "50px"
function modePage() {
    if (document.body.className == "dark") {
        document.body.className = "light"
        modeImage.src = "/img/icons8-moon-50.png"
        pageModeText.textContent = "Dark Mode"
        themeMode = "light"
        localStorage.setItem("theme", themeMode)
    }
    else {
        document.body.className = "dark"
        modeImage.src = "/img/icons8-sun-64.png"
        modeImage.style.width = "50px"
        pageModeText.textContent = "Light Mode"
        themeMode = "dark"
        localStorage.setItem("theme", themeMode)
    }
}




let borderCountries = []

const country = JSON.parse(localStorage.getItem('country'))
console.log(country)



if (country.borders)
    getBorderCountries(country.borders)
else{
    const borderItemNone = document.createElement("p")
    borderItemNone.textContent = "no border states"
    borderItemNone.className = "countries-name-text"
    countryBorder.appendChild(borderItemNone)
}

async function getBorderCountries(borders) {
    let bordersStr = borders.join(",")
    const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${bordersStr}`)
    borderCountries = await response.json()
    borderCountries.forEach(element => {
        fillBorderCountries(element)
    });
    console.log("Border Countries", borderCountries)
}
function fillBorderCountries(item) {
    console.log(item.name.common)
    const borderItem = document.createElement("p")
    borderItem.textContent = item.name.common
    borderItem.className = "countries-name-text"
    countryBorder.appendChild(borderItem)
    borderItem.onclick = () =>{
        toChildBorder(item)
    }

}

function toChildBorder(childBorder){
    localStorage.setItem("theme", themeMode)
    localStorage.setItem("country", JSON.stringify(childBorder))
    window.location.href = "country-detail.html"
}


const countryflag = document.getElementById("country-flag")
countryflag.src = country.flags.svg

const countryName = document.getElementById("country-name")
countryName.textContent = country.name.common

const countryNativeName = document.getElementById("nativeName")
const countryPopulation = document.getElementById("population")
const countryContinent = document.getElementById("country")
const countrySubRegion = document.getElementById("subRegion")
const countryCapital = document.getElementById("capital")
const countryDomain = document.getElementById("domain")
const countryCurrencies = document.getElementById("currencies")
const countryLanguage = document.getElementById("language")

countryNativeName.textContent = country.name.official
countryPopulation.textContent = country.population
countryContinent.textContent = country.continents
countrySubRegion.textContent = country.subregion
countryCapital.textContent = country.capital
countryDomain.textContent = country.tld
countryCurrencies.textContent = ""
const currencyKeys = Object.keys(country.currencies)
currencyKeys.forEach(element => {
    countryCurrencies.textContent = countryCurrencies.textContent + " " + country.currencies[element]
});
countryCurrencies.textContent = country.currencies[currencyKeys[0]].name
countryLanguage.textContent = ""
const langKeys = Object.keys(country.languages)
langKeys.forEach(element => {
    countryLanguage.textContent = countryLanguage.textContent + " " + country.languages[element]
});