const express = require("express") // To start our nodejs server
const mysql = require("mysql") // import mysql 
const dotenv = require("dotenv") // import dotenv
const path = require("path")    // import path

dotenv.config({ path: './.env'})    // All SECRETS will be saved in this file

const app = express()   

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
}) // create connection to database

// __dirname gives access to the current directory
const publicDirectory = path.join(__dirname, './public') 
// Tells express from where to pick static files
app.use(express.static(publicDirectory)) 

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }))
// Parse JSON bodies (as sent by API Clients)
app.use(express.json())

app.set("view engine", 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error)
    }
 
})  // connect to database

// Define Routes
app.use('/', require('./routes/pages'))
app.use('/leave', require('./routes/leave'))

// start the application on port 5001
app.listen(5001)// Tell express which port to listen

