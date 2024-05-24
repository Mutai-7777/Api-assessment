document.addEventListener('DOMContentLoaded', () => {
    const countriesContainer = document.getElementById('countries-container');
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('region-filter');

    let countriesData = [];

    // Fetch countries data from API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            countriesData = data;
            displayCountries(countriesData);
        });

    // Display countries
    function displayCountries(countries) {
        countriesContainer.innerHTML = '';
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.classList.add('country-card');
            countryCard.innerHTML = `
                <img src="${country.flags.svg}" alt="${country.name.common}">
                <h3>${country.name.common}</h3>
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Region: ${country.region}</p>
                <p>Capital: ${country.capital}</p>
                
            `;
            countriesContainer.appendChild(countryCard);
        });
    }

    // Filter countries by search
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCountries = countriesData.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm)
        );
        displayCountries(filteredCountries);
    });

    // Filter countries by region
    regionFilter.addEventListener('change', () => {
        const region = regionFilter.value;
        const filteredCountries = region === 'all'
            ? countriesData
            : countriesData.filter(country => country.region === region);
        displayCountries(filteredCountries);
    });
});

function viewCountryDetail(cca3) {
    localStorage.setItem('countryCode', cca3);
    window.location.href = 'detail.html';
}
function toggleTheme() {
    // alert('clicked');
    debugger

    var currentTheme = document.documentElement.getAttribute('data-theme');
    var text = document.getElementById('dark-mode-text');

    if (currentTheme === 'light') {
        targetTheme = 'dark';
        text.innerText = "Light Mode";
        document.getElementsByTagName('ion-icon')[0].setAttribute('name', 'sunny-outline');
    } else if (currentTheme === 'dark') {
        targetTheme = 'light';
        text.innerText = "Dark Mode";
        document.getElementsByTagName('ion-icon')[0].setAttribute('name', 'moon-outline');
    }

    document.documentElement.setAttribute('data-theme', targetTheme);

}
