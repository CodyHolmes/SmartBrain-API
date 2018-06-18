const express = require('express');
const bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var cors = require('cors');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const tempDatabase = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.json(tempDatabase.users);
});

app.post('/signin', (req, res) => {
    if (req.body.email === tempDatabase.users[0].email &&
        req.body.password === tempDatabase.users[0].password)
    {
        res.json(tempDatabase.users[0]);
    } else {
        res.status(400).json('error')
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //     console.log(hash);
    // });

    tempDatabase.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    });
    res.json(tempDatabase.users[tempDatabase.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    tempDatabase.users.forEach(user => {
        if (user.id === id) {
            found = true;
            res.json(user);
        }
    });
    if(!found){
        res.status(400).json('error');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    tempDatabase.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            res.json(user.entries);
        }
    });
    if(!found){
        res.status(400).json('error');
    }
});

app.listen(3000, () => {
    console.log('The server is running');
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user
*/