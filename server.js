const { request } = require('express');
const express = require('express'); //import express
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const db = knex({     //connecting the db to our server with knex
  client: 'pg',
  connection: {
    host: '127.0.0.1', //this equals to localhost
    user: 'sebastiantong',
    password: '',
    database: 'facerecon'
  }
});

// db.select('*').from('users').then(data => console.log(data));

const app = express(); //run express

app.use(express.urlencoded({extended: false})); //middleware to send json from front to back
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  // res.send(database.users) fake database no longer exists
})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })
app.listen(3000, ()=> {    //hosts on port 3k and second parameter is a function that runs after the server is up.
  console.log('app OK in 3000')
})


//root route --> response with 'this is working'
//register route --> POST the new user and return it with response
//sign in route --> POST data/json and then respond with 'success/fail'
//profile/:userId --> GET user
//image --> PUT --> updates the count for the rank


//bcrypt usage:
// bcrypt.hash("bacon", null, null, function(err, hash) {
//   // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });
