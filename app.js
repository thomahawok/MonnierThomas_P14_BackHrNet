const express = require('express');
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const {Client} = require('pg');


const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'test',
    database: 'RHUSERS'
});


client.connect()
.then(() => console.log('Connected to database'))
.catch(err => console.error('Connection error', err.stack))

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/users', (req, res, next) => {
    console.log(req.body);
    client.query('insert into users_liste  values($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.startDate, req.body.department, req.body.street, req.body.city, req.body.state, req.body.zipCode], (err, result) => {
        if(!err){
            res.status(201).json({message: 'User added successfully!'});
        }else{
            res.status(400).json({error: err.message});
           
        }
    });
});


app.get('/api/users',  async (req, res, next) => {

   const result = await client.query('select * from users_liste', (err, result) => {
        if(!err){
            res.status(200).json(result.rows);
        }else{
            res.status(400).json({error: err.message});
        }
    });
});


app.delete('/api/users/:id', (req, res, next) => {
    client.query('delete from users_liste where id = $1', [req.params.id], (err, result) => {
        if(!err){
            res.status(200).json({message: 'User deleted successfully!'});
        }else{
            res.status(400).json({error: err.message});
        }
    });
});

module.exports = app;
