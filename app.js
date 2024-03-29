const express = require('express'); //import express
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const PORT = process.env.PORT || 3000;

//solves ssl/tsl self signed certificate error
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({     //connecting the db to our server with knex. DATABASE_URL declared in env vars.
  client: 'pg',
  connection: {
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl:true
  }
});

const app = express(); //run express

app.use(express.urlencoded({extended: false})); //middleware to send json from front to back
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('hello')
})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })
app.listen(PORT, ()=> {    //hosts on port declared by env, other wise on 3k and second parameter is a function that runs after the server is up.
  console.log(`app OK in ${PORT}`)
})
