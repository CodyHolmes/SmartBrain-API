const express = require('express');
const bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var cors = require('cors');
var knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'cody',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.json('Smart Brain API') });
app.post('/signin', signin.handleSignin(db, bcrypt)); // Using currying
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) }); // Using a more readable call
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => {
    console.log('The server is running');
});