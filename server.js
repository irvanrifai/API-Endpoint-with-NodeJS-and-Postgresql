// server.js File
const express = require('express'); // Importing express module
const bodyParser = require('body-parser');
const app = express(); // Creating an express object
const port = 8000; // Setting an port for this application
const db = require('./query')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// routing
app.get('/', (request, response) => {
	response.send('we are at the root route of our server');
})
app.get('/data', db.getAllData)
app.get('/data/:id', db.getData)
app.post('/data', db.createData)
app.put('/data/:id', db.updateData)
app.delete('/data/:id', db.deleteData)

// Starting server using listen function
app.listen(port, function (error) {
	if (error) {
		console.log("Error while starting server");
	}
	else {
		console.log("Server has been started at port "+port);
	}
})
