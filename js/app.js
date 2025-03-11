const $searchInput = document.querySelector(".search-input");
const $selectedRegion = document.querySelector(".select-input");
const $africa = document.querySelector("#africa");
const $america = document.querySelector("#america");
const $asia = document.querySelector("#asia");
const $europe = document.querySelector("#europe");
const $oceania = document.querySelector("#oceania");
const $darkMode = document.querySelector(".dark-mode");
const $header = document.querySelector("header");
const $mainWrapper = document.querySelector(".main-wrapper");

console.log($mainWrapper)

$darkMode.addEventListener("click", function() {
    console.log("dark mode enabled")
    $header.classList.add("header-black-mode");
    $mainWrapper.classList.add("dark-mode-main");
    $searchInput.classList.add("dark-mode-search-input");
    $selectedRegion.classList.add("select-input-darkmode");
})

let countries;

let card = []

fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        countries = data;
        console.log(countries);

        countries.forEach(country => {
            const $results = document.querySelector(".results");
            const $countryCard = document.createElement("div");
            $results.appendChild($countryCard);
            $countryCard.setAttribute("data-region", country.region);
            $countryCard.setAttribute("data-name", country.name.common);
            $countryCard.classList.add("country-card");
            const $countryImg = document.createElement("img");
            $countryCard.appendChild($countryImg);	
            $countryImg.classList.add("country-flag");
            const $countryDetails = document.createElement("div");
            $countryCard.appendChild($countryDetails);
            $countryDetails.classList.add("country-details");
            const $countryName = document.createElement("h2");
            $countryDetails.appendChild($countryName);
            const $countryList = document.createElement("ul");
            $countryDetails.appendChild($countryList);
            const $countryLi1 = document.createElement("li");
            const $countryLi2 = document.createElement("li");
            const $countryLi3 = document.createElement("li");
            $countryList.appendChild($countryLi1);
            $countryList.appendChild($countryLi2);
            $countryList.appendChild($countryLi3);
            const $span1 = document.createElement("span");
            const $span2 = document.createElement("span");
            const $span3 = document.createElement("span");
            $countryLi1.appendChild($span1);
            $countryLi2.appendChild($span2);
            $countryLi3.appendChild($span3);
            $countryImg.src = country.flags.svg;
            $countryName.innerHTML = country.name.common;
            $span1.innerHTML = "Capital: " + country.capital;
            $span2.innerHTML = "Region: " + country.region;
            $span3.innerHTML = "Population: " + country.population.toLocaleString("en-US"); 
            card.push($countryCard);
            $darkMode.addEventListener("click", function() {
                $countryCard.classList.add("dark-mode-countrycard")
            })



















            $countryCard.addEventListener("click", function() {
                const $countryDetailsPage = document.querySelector(".country-details-page")
                console.log("clicked on " + country.name.common);
                $countryDetailsPage.classList.remove("hide");
                $mainWrapper.classList.add("hide");
                fetch("https://restcountries.com/v3.1/name/" + country.name.common)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);


                    const $countryName = document.createElement("h2");
                    const $countryNativeName = document.createElement("p");
                    const $countryPopulation = document.createElement("p");
                    const $countryRegion = document.createElement("p");
                    const $countrySubRegion = document.createElement("p");
                    const $countryCapital = document.createElement("p");
                    const $countryTopLevelDomain = document.createElement("p");
                    const $countryCurrencies = document.createElement("p");
                    const $countryLanguages = document.createElement("p");

                    const $countryImg = document.createElement("img");

                    $countryImg.classList.add("big-country-flag");
                    $countryImg.src = data[0].flags.svg;
                    
                    const $newPageInformationCountry = document.createElement("div");
                    $countryDetailsPage.appendChild($newPageInformationCountry);

                    console.log($newPageInformationCountry)
                    $newPageInformationCountry.classList.add("new-page-information-country");
                    $newPageInformationCountry.appendChild($countryImg);
                    
                    const $backButton = document.querySelector(".back-button");

                    $backButton.addEventListener("click", function() {
                        $countryDetailsPage.classList.add("hide");
                        $mainWrapper.classList.remove("hide");
                        $newPageInformationCountry.innerHTML = "";
                    }) 


                })
            })















        });


        $selectedRegion.addEventListener("change", function (e) {
            let selectedValue = e.target.value;
            console.log(selectedValue);
            card.forEach(function(cards) {
                if (cards.getAttribute("data-region") === selectedValue) {
                    cards.classList.remove("hide");
                } else {
                    cards.classList.add("hide");
                }

                if (selectedValue === "") {
                    cards.classList.remove("hide");
                }
            })
        })
        
        $searchInput.addEventListener("input", function (e) {
            let searchValue = e.target.value.toLowerCase();
            card.forEach(function(cards) {
                if (cards.getAttribute("data-name").toLowerCase().includes(searchValue)) {
                    cards.classList.remove("hide");
                } else {
                    cards.classList.add("hide");
                }
            })
        })

        

    });


