const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';
const cors = require('cors')
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'smartbrain'
  }
})

const app = express();

app.use(bodyParser.json());
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            password: 'banana',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}


app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {

    if( req.body.email === database.users[0].email 
        && req.body.password === database.users[0].password)
        {
            res.json(database.users[0]);
        } else {
            res.status(400).json('error loggin')
        }

})

app.post('/register', (req, res) => {

    const {email, name, password} = req.body;

    bcrypt.hash(password, saltRounds).then(function(hash) {
        console.log(hash)
        // Store hash in your password DB.
    });

    db('users')
        .returning('*')
        .insert({
        email :email,
        name: name,
        joined: new Date()
    }).then(user => {
        res.json(user[0])
    })
    .catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:id', (req, res) => {

    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            found = true;
            return res.json(user);
        } 
    })
    if (!found) {
        res.status(404).json('no found user')
    }
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        } 
    })
    if (!found) {
        res.status(404).json('no found user in db')
    }
})



// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash).then(function(res) {
//     // res == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash).then(function(res) {
//     // res == false
// });



app.listen(3000, () => {
    console.log('server is running')
});


/*

    /           --> res = thisi is working
    /signin     --> POST  success/fail
    /register   --> POST  user
    /profile/:userId    --> GET user
    /image      --> PUT   user
    
*/