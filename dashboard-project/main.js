import CONFIG from "./config";

// 1. Add date and time 
//************************** 
function updateDateTime() {
  // Get the current date and time
  const now = new Date();

  // Format the date and time as strings
  const dateString = now.toLocaleDateString(); // Date without time
  const timeString = now.toLocaleTimeString(); // Time without date

  // Combine date and time with extra space in between
  const dateTimeString = `${timeString}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${dateString}`;

  // Update the content and apply the "date-time" class
  const dateTimeElement = document.getElementById('datetime');
  dateTimeElement.innerHTML = dateTimeString;
  dateTimeElement.classList.add('datum');
}

// Call the updateDateTime function initially
updateDateTime();

// Set up an interval to update the date and time every second
setInterval(updateDateTime, 1000);


// **************************************
/////// 2.Chang title/rubrike and save on localstorage
// ***************************************

// Load saved title from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
  loadSavedTitle();
});

function handleKeyPress(event) {
  const header = document.getElementById("dashboardTitle");

  if (event.key === "Enter") {
      // Pressing Enter will prevent a new line and blur the element
      event.preventDefault();
      header.blur();
  }

  if (event.key === "Delete" || event.key === "Backspace") {
      // Pressing Delete or Backspace will remove the title
      header.innerText = "";
      saveChanges(); // Save changes after removing the title
  }
}

function saveChanges() {
  const header = document.getElementById("dashboardTitle");

  if (header) {
      const updatedTitle = header.innerText;
      localStorage.setItem("dashboardTitle", updatedTitle);
  }
}

function loadSavedTitle() {
  const header = document.getElementById("dashboardTitle");
  const savedTitle = localStorage.getItem("dashboardTitle");

  if (header && savedTitle) {
      header.innerText = savedTitle;
  }
}


// **************************************
// 3.THis section is for first card for add link
// ***************************************

// Function to retrieve links from local storage
function getStoredLinks() {
  return JSON.parse(localStorage.getItem("links")) || [];
}

// Function to save links to local storage
function saveLinksToLocalStorage(links) {
  localStorage.setItem("links", JSON.stringify(links));
}

// Function to remove a link
function removeLink(linkIndex) {
  const links = getStoredLinks();
  links.splice(linkIndex, 1);
  saveLinksToLocalStorage(links);

  // Remove the link from the DOM
  const linkContainer = document.getElementById("linkContainer");
  linkContainer.innerHTML = ""; // Clear the existing links
  initializeLinks(); // Reinitialize the links
}

// Create a function for adding a link
function addLink() {
  const name = prompt("Enter the name of the link ");
  const url = prompt("Enter the URL:");

  if (name !== null && name !== "" && url !== null && url !== "") {
      const linkContainer = document.getElementById("linkContainer");

      // Create Link element
      const linkElement = document.createElement("div");
      linkElement.className = "link"; // Add a class for styling
      linkElement.style.display = "flex";
      linkElement.style.alignItems = "center";
      linkElement.style.marginBottom = "10px";
      // Create icon element
      const iconElement = document.createElement("img");
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${url}`;
      iconElement.src = faviconUrl;
      iconElement.alt = "Favicon";
      iconElement.style.marginRight = "10px"; // Adjusted margin

      // Append the icon to the link on the left
      linkElement.appendChild(iconElement);

      // Create text node with the user-provided name
      const textNode = document.createTextNode(name);

      // Append the text to the link on the right
      linkElement.appendChild(textNode);

      // Create remove button
      const removeButton = document.createElement("button");
      removeButton.innerText = "x";
      removeButton.style.fontSize = "12px";
      removeButton.style.width="1.5rem";
      removeButton.style.height="1.5rem";
      removeButton.style.borderRadius="50%";
      removeButton.style.border="none";
      removeButton.style.marginLeft="4rem";
      removeButton.style.backgroundColor="rgb(255 255 255 / 45%)";
      removeButton.style.cursor="pointer";

      
      removeButton.onclick = function () {
          removeLink(Array.from(linkContainer.children).indexOf(linkElement));
      };

      // Append the remove button to the link
      linkElement.appendChild(removeButton);

      // Append the link to the container
      linkContainer.appendChild(linkElement);

      // Retrieve existing links from local storage
      const links = getStoredLinks();

      // Save the new link information to local storage
      links.push({ name, url });
      saveLinksToLocalStorage(links);
  }
}

// Function to initialize links from local storage on page load
function initializeLinks() {
  const links = getStoredLinks();
  const linkContainer = document.getElementById("linkContainer");

  // Create link elements for each stored link
  links.forEach((link, index) => {
      const linkElement = document.createElement("div");
      linkElement.className = "link"; // Add a class for styling
      linkElement.style.display = "flex";
      linkElement.style.alignItems = "center";
      linkElement.style.marginBottom = "10px";
      // Create icon element
      const iconElement = document.createElement("img");
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${link.url}`;
      iconElement.src = faviconUrl;
      iconElement.alt = "Favicon";
      iconElement.style.marginRight = "10px"; // Adjusted margin

      // Append the icon to the link on the left
      linkElement.appendChild(iconElement);

      // Create text node with the stored link name
      const textNode = document.createTextNode(link.name);

      // Append the text to the link on the right
      linkElement.appendChild(textNode);

      // Create remove button
      const removeButton = document.createElement("button");
      removeButton.innerText = "x";
      removeButton.style.fontSize = "12px";
      removeButton.style.width="1rem";
      removeButton.style.height="1rem";
      removeButton.style.borderRadius="50%";
      removeButton.style.border="none";
      removeButton.style.marginLeft="4rem";
      removeButton.style.backgroundColor="rgb(255 255 255 / 45%)";
      removeButton.style.cursor="pointer"
      


      removeButton.onclick = function () {
          removeLink(index);
      };

      // Append the remove button to the link
      linkElement.appendChild(removeButton);

      // Append the link to the container
      linkContainer.appendChild(linkElement);
  });
}

initializeLinks();


// *************************************
// 4.Dagens väder
// *************************************


const apiKey = CONFIG.OPENWEATHER_API_KEY;
console.log(apiKey);

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Load last searched city from local storage on page load
const lastSearchedCity = localStorage.getItem('lastSearchedCity');
if (lastSearchedCity) {
  searchBox.value = lastSearchedCity;
  checkWeather(lastSearchedCity);
}
async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
  if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
  } else {
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

      // Set weather icon based on weather condition
      if (data.weather[0].main == "Clouds") {
          weatherIcon.src = "image/clouds.png";
      } else if (data.weather[0].main == "Clear") {
          weatherIcon.src = "image/clear.png";
      } else if (data.weather[0].main == "Rain") {
          weatherIcon.src = "image/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
          weatherIcon.src = "image/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
          weatherIcon.src = "image/mist.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";

      // Save the current search to local storage
      localStorage.setItem('lastSearchedCity', city);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});



// *************************************
//  5- Currency Converter
// *************************************
   
let apikey = CONFIG.EXCHANGERATE_API_KEY;
console.log(apikey);

let api = `https://v6.exchangerate-api.com/v6/${apikey}/latest/USD`;
const fromDropDown = document.getElementById("form-currency-select");
const toDropDown = document.getElementById("to-currency-select");

// Fetch currency data from the API
fetch(api)
  .then((response) => response.json())
  .then((data) => {
    // Get the list of currencies from the API response
    const currencies = Object.keys(data.conversion_rates);

    // Create dropdown options for currencies
    currencies.forEach((currency) => {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      fromDropDown.add(option);
    });

    currencies.forEach((currency) => {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      toDropDown.add(option);
    });

    // Set default values for dropdowns
    fromDropDown.value = "USD";
    toDropDown.value = "SEK";
  })
  .catch((error) => {
    console.error("Error fetching currency data:", error);
  });

let convertCurrency = () => {
  // Create Reference
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  // If amount input field is not empty
  if (amount.length !== 0) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
      });
  } else {
    alert("Please fill in the amount");
  }
};

document.querySelector("#conver-button").addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);




// *************************************
//  6- Anteckningar
// *************************************
   
      document.addEventListener("DOMContentLoaded", function() {
          const noteArea = document.getElementById('note-area');
          const savedNote = localStorage.getItem('quickNote');

          if (savedNote) {
              noteArea.value = savedNote;
          }

          // Save the note content to local storage on input
          noteArea.addEventListener('input', function() {
              localStorage.setItem('quickNote', noteArea.value);
          });
      });

// *************************************
// 7. Slum ny background
// *************************************

// Replace 'YOUR_UNSPLASH_ACCESS_KEY' with your actual Unsplash access key
const unsplashAccessKey = CONFIG.UNSPLASH_ACCESS_KEY;
console.log(unsplashAccessKey);


function changeBackground() {
  const searchTerm = document.getElementById('searchTerm').value;
  // Fetch a random image from Unsplash based on the user's search term
  fetch(`https://api.unsplash.com/photos/random?query=${searchTerm}&client_id=${unsplashAccessKey}`)
      .then(response => response.json())
      .then(data => {
          if (data.urls && data.urls.full) {
              // Set the background image of the body
              document.body.style.backgroundImage = url('${data.urls.full}');
          } else {
              console.error('Invalid response from Unsplash API');
          }
      })
      .catch((error) => {
          console.error('Error fetching data from Unsplash API:', error.message);
      })};