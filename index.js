const searchInput = document.querySelector('#search');
const container = document.querySelector('.container');
const body = document.querySelector('.main');
const loader = document.querySelector('.loader'); 
const formContainer = document.querySelector('.form-container');
const title = document.querySelector('.title');


let countries = [];


const getCountries = async () => {
  try {
   
    
    container.innerHTML = `
    <div class="loader"></div>
    `;

    
    const response = await (await fetch (`https://restcountries.com/v3.1/all`)).json();
    
    countries = response;
    

  } catch (error) {
    console.log(error);
  }
}

getCountries();

searchInput.addEventListener('input', async e => {
  
  const query = e.target.value.toLowerCase();

 
  const countriesFilter = countries.filter((country) => country.translations.spa.common.toLowerCase().startsWith(query));
  console.log(countriesFilter);

  
  container.innerHTML = '';

 
  if (query === '') {
    return;

  
  } else if (countriesFilter.length > 10) {
    container.innerHTML = `
    <p class="country-helper-text">Demasiados paises, especifica mejor tu busqueda </p>
    `;

  
  } else if (countriesFilter.length > 1 && countriesFilter.length <= 10) {
  
    countriesFilter.forEach(country => {
  
    const div = document.createElement('div');
    div.className = 'country-container-min';
  
    div.innerHTML = `
    <img class="country-img-min" src="${country.flags.svg}" alt="Bandera de ${country.translations.spa.common}" >
    <h2 class="country-name-min">${country.translations.spa.common}</h2>
    `;
    
    container.appendChild(div);
    console.log(div);
    })

  
  } else if (countriesFilter.length === 1) {

    
    const country = countriesFilter[0];
   
    container.innerHTML = `
    <div class="country-container-max">
      <div class="country-principal-info">
    <h2 class="country-name-max">${country.translations.spa.common}</h2>
    <img class="country-img-max" src="${country.flags.svg}" alt="Bandera de ${country.translations.spa.common}" >
      </div>
      <div class="country-info-container">
    <p class="country-info">Capital: ${country.capital}</p>
    <p class="country-info">Habitantes: ${country.population.toLocaleString()}</p>
    <p class="country-info">Continente: ${country.continents}</p>
    <p class="country-info">Región: ${country.subregion}</p>
    <p class="country-info">Zona Horaria: ${country.timezones}</p>
    <div id="weather-info">
        <p>Cargando información del clima...</p>
    </div>
      </div>
    </div>
    `;

    try {
    
    const apiKey = '77f7ab6c0dd4a6615ae6fda09523b054';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric&lang=es`;
    const weatherResponse = await fetch(weatherUrl);
    const dataWeather = await weatherResponse.json();
    
    const weatherInfo = document.getElementById('weather-info');
      weatherInfo.innerHTML = `
      <p class="country-info">Temperatura: ${dataWeather.main.temp}°Celsius</p>
        <div class="weather-icon-container">
      <p class="country-info">Clima: ${dataWeather.weather[0].description}</p>
      <img class="weather-icon" src="http://openweathermap.org/img/w/${dataWeather.weather[0].icon}.png" alt="Icono clima">
        </div>
      `;

    } catch (error) {
      console.log(error);
    }

   }

});
