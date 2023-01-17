// server.js File
const express = require('express'); // Importing express module
const bodyParser = require('body-parser');
const { request, response } = require('express');
const app = express(); // Creating an express object
const port = 8000; // Setting an port for this application
const Pool = require('pg').Pool;

const pool = new Pool({
	user: '',
	host: 'localhost',
	database: 'postgres',
	password: '',
	dialect: 'postgres',
	port: 5432
});

// get all data
const getAllData = (request, response) => {
	pool.query('SELECT * FROM test', (error, results) => {
		if (error) {
			throw error
		} else if (results.rows == 0){
            return response.status(404).json({message:"data not found"})
        } else {
            console.log(results.rowCount)
		    return response.status(200).json(results.rows)
        }
    })
}

// get single data
const getData = (request, response) => {
	const id = parseInt(request.params.id)
	pool.query('SELECT * FROM test WHERE id = $1', [id], (error, results) => {
		if (error) {
            throw error
		} else if (results.rows == 0){
            return response.status(404).json({message:"data not found"})
        } else {
            console.log(results.rowCount)
            return response.status(200).json(results.rows)
        }
	})
}

// add new data
const createData = (request, response) => {
	const {names, address, city, pincode, id} = request.body

	pool.query('INSERT INTO test (names, address, city, pincode, id) VALUES ($1, $2, $3, $4, $5) RETURNING *',[names, address, city, pincode, id], (error, results) => {
		if (error) {
			throw error
		}
        console.log('New data inserted : '+results.rowCount)
		return response.status(201).send('New data inserted : '+results.rowCount)
	})
}

// update data
const updateData = (request, response) => {
	const id = parseInt(request.params.id)
	const {names, address, city, pincode} = request.body

	pool.query('UPDATE test SET names = $1, address = $2, city = $3, pincode = $4 WHERE id = $5', [names, address, city, pincode, id], (error, results) => {
		if (error) {
			throw error
		} else if (results.rowCount == 0){
            return response.status(404).json({message:"data not found"})
        } else {
            console.log('Data updated  with ID : '+id)
            return response.status(200).send('Data updated with ID : '+id)
        }
	})
}

// delete data
const deleteData = (request, response) => {
	const id = parseInt(request.params.id)

	pool.query('DELETE FROM test WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error
		} else if (results.rowCount == 0){
            return response.status(404).json({message:"data not found"})
        } else {
            console.log('Data deleted with ID : '+id)
            return response.status(200).send('Data deleted with ID : '+id)
        }
	})
}

module.exports = {
    getAllData,
    getData,
    createData,
    updateData,
    deleteData
}