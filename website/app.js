/* Global Variables */
const apiKey = '&appid=62d0d0939da5822ecf43caf7656b0ffc&units=imperial';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', pgWeather);

/* Function called by event listener */
function pgWeather() {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    gWeatherData(baseUrl, zip, apiKey)
    .then((data) => {
        postData('/addData', {temp: data.main.temp, date: newDate, response: feelings});
    })
    .then(
        updateUI()
    )
};

/* Function to GET Web API Data */
const gWeatherData = async (baseUrl, zip, apiKey) => {
    const req = await fetch(baseUrl+zip+apiKey);
    try {
        const data = await req.json();
        return data;
    } catch(err) {
        console.log('error', err);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        return newData;
    } catch(err) {
        console.log('error', err);
    }
}

/* Update UI*/
const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp} Fahrenheit`;
        document.getElementById('content').innerHTML = `You are feeling: ${allData.response}`;
    } catch (err) {
        console.log('error', err);
    }
};