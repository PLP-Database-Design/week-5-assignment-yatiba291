// importing the neccessary dependencies
const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

//create a connection Object
const db = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME
})

// TEST THE CONNECTION
db.connect((err) => {
   //connection not successful
   if(err) {
      return console.log("Error connecting to MYSQL", err)
   }

   //connection successful
   console.log("MYSQL connection successful")
})

// Answer to question 1. 
//get patients
app.get('/get-patients', (req, res) => {
    const getPatients = "SELECT * FROM patients"

    db.query(getPatients, (err,results) => {
      // have an error
      if(err) {
         return res.status(500).send("Failed to fecth the patients")
      }

      // get back the data/results
      res.status(200).send(results)
    })
})


// Question 2: Get Providers
app.get('/get-providers', (req, res) => {
   const getProviders = "SELECT * FROM providers"

   db.query(getProviders, (err,results) => {
     // have an error
     if(err) {
        return res.status(500).send("Failed to fecth the providers")
     }

     // get back the data/results
     res.status(200).send(results)
   })
})

// Filter patients by first name
app.get('/patient/firstname', (req, res) => {
  const query = 'SELECT first_name FROM patients';

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to retrieve patient names' });
    } else {
      res.json(result);
    }
  });
});


 // Question 4
 app.get('/provider/specialty', (req, res) => {
  const query = 'SELECT provider_specialty FROM providers';

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to retrieve provider specialties' });
    } else {
      res.json(result);
    }
  });
});
//  declear the port and listen to the server
   const PORT = 3000;
   app.listen(PORT, () => {
     console.log(`server is running on PORT ${PORT}`)
   })