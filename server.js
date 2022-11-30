// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
});

//GET route
app.get('/all', (req, res) => {
    res.send(projectData);
});

//POST route
app.post('/addData', (req, res) => {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['response'] = req.body.response;
    res.send(projectData);
    console.log(projectData);
})