/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=d08696c338999a2b3bcef5547f4086bf&units=metric';



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, zipCode, apiKey)
    .then(function(data) {
        postData('/addData', {temperature: data.main.temp, date: newDate, userResponse: feelings});
    })
    .then(function() {
        updateUI();
    })
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL+zipCode+apiKey);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
};

async function updateUI() {
    try {
      const request = await fetch('/all');
      const allData = await request.json();
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temperature;
      document.getElementById('content').innerHTML = allData.userResponse;
    } catch (error) {
      console.log("Error:", error);
    }
  };
  let blueShades = ['#00008B', '#0000CD', '#0000FF', '#1E90FF', '#ADD8E6', '#87CEEB', '#6495ED', '#00BFFF', '#87CEFA', '#B0C4DE', '#F0F8FF'];
let index = 0;

setInterval(function() {
  document.body.style.backgroundColor = blueShades[index];
  index = (index + 1) % blueShades.length;
}, 1000);
