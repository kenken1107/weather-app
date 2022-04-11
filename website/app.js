/* Global Variables */
const personalKEY = 'd5fe94d6a3ea6b6749240e38bf650ca6'
const apiKey      = `&APPID=${personalKEY}&units=imperial`;
const baseURL    = "http://api.openweathermap.org/data/2.5/weather?zip="

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// "http://api.openweathermap.org/data/2.5/weather?zip=166-0012,JP&APPID=d5fe94d6a3ea6b6749240e38bf650ca6&units=imperial"

// Add event listener for activating click event
const generateElement = document.getElementById("generate");
generateElement.addEventListener("click", (event)=>{
    event.preventDefault();
    
    // Get Wheather Data
    const zipElement   = document.getElementById("zip");
    const zipcode      = zipElement.value.trim();
    if (zipcode !== ''){
        const url          = baseURL + zipcode + apiKey;
        getWeatherInfo(url) //← This returns Promise!
        .then((weatherData)=>{
            const response = postData('/post', data={
                temp: weatherData.main.temp,
                date: newDate,
                feelings: document.getElementById('feelings').value.trim()});
            }).then((response)=>{
                updateUI()
            }).catch((error)=>{
                console.log(error);
            });
    }else{
        alert("You need to put your zip code!")
    }
    
        });

/*                  */
/* Helper Functions */
/*                  */

// Async functions for getting weather information (which means it returns Promise)
const getWeatherInfo = async (url='') => {
    try { 
        const response     = await fetch(url);
        const jsonResponse = await response.json();
        return jsonResponse
    }
    catch(error){
        console.log(error);
    }
};

// Async functions for just posting weather information in 'projectData' object
const postData = async(url='', data={}) => {
    try{
        const response = await fetch(url, {
                method: 'POST', 
                credentials: 'same-origin',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
        );
    } catch(error){
        console.log(error);
    }
};

const updateUI = async () => {
    const request = await fetch('/all');

    try {
        // Transform into JSON
        const allData = await request.json()
        const dataDisplayed = await allData
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML    = Math.round(dataDisplayed.temp)+ 'degrees';
        document.getElementById('content').innerHTML = dataDisplayed.feelings;
        document.getElementById("date").innerHTML    = dataDisplayed.date;
    }
    catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
};