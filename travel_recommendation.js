fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    // Handle search on button click
    const searchButton = document.getElementById('search_button');
    searchButton.addEventListener('click', handleSearch.bind(null, data));
  })
  .catch(error => {
    console.log('Error:', error);
  });

// Function to handle search
function handleSearch(data) {
    const searchInput = document.getElementById('search_input');
    const keyword = searchInput.value.trim().toLowerCase();
  
    if (keyword) {
      let matchingResults = [];
      let matchingTemples = [];
      let matchingBeaches = [];
      let matchingcities = [];

     
    

    matchingResults = data.countries.filter(country => {
        const matchingCities = country.cities.filter(city => city.name.toLowerCase().includes(keyword));
        if (matchingCities.length > 0) {
          country.cities = matchingCities;
          return true;
        }
        return false;
      });



    
  
      matchingTemples = data.temples.filter(temple => {
        return temple.name.toLowerCase().includes(keyword);
      });
  
      matchingBeaches = data.beaches.filter(beach => {
        return beach.name.toLowerCase().includes(keyword);
      });
  
      const searchResults = {
        countries: matchingResults,
        temples: matchingTemples,
        beaches: matchingBeaches,
        cities:matchingcities
      };
  
      displayResults(searchResults);
    } else {
      // Empty search, display appropriate message or take necessary action
      displayResults({});
    }
  }
// Function to display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
  
    if (Object.keys(results).length > 0) {
      if (results.countries && results.countries.length > 0) {
        results.countries.forEach(country => {
          const countryHeading = document.createElement('h3');
          countryHeading.textContent = `Matching Cities in ${country.name}:`;
          resultsContainer.appendChild(countryHeading);
  
          country.cities.forEach(city => {
            const cityItem = document.createElement('div');
            cityItem.textContent = city.name;
            resultsContainer.appendChild(cityItem);

            const cityImg = document.createElement('img');
            cityImg.src = city.imageUrl;
            cityItem.appendChild(cityImg);

            const citydescription = document.createElement('p');
            citydescription.textContent = city.description;
            cityItem.appendChild(citydescription);
          });
        });
      }

   
  
      if (results.temples && results.temples.length > 0) {
        const templesHeading = document.createElement('h3');
        templesHeading.textContent = 'Matching Temples:';
        resultsContainer.appendChild(templesHeading);
  
        results.temples.forEach(temple => {
          const templeItem = document.createElement('div');
          templeItem.textContent = temple.name;
          resultsContainer.appendChild(templeItem);

          const breake= document.createElement('br');
          
          templeItem.appendChild(breake);

          const templeImg= document.createElement('img');
          templeImg.src = temple.imageUrl;
          templeItem.appendChild(templeImg);

          const templeDesc= document.createElement('p');
          templeDesc.textContent = temple.description;
          templeItem.appendChild(templeDesc);
          
        });
      }
  
      if (results.beaches && results.beaches.length > 0) {
        const beachesHeading = document.createElement('h3');
        beachesHeading.textContent = 'Matching Beaches:';
        resultsContainer.appendChild(beachesHeading);
  
        results.beaches.forEach(beach => {
          const beachItem = document.createElement('div');
          beachItem.textContent = beach.name;
          resultsContainer.appendChild(beachItem);
        });
      }
    } else {
      const noResultsMessage = document.createElement('p');
      noResultsMessage.textContent = 'No results found.';
      resultsContainer.appendChild(noResultsMessage);
    }
  }