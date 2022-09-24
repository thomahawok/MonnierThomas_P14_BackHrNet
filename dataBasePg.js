const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const {Client} = require('pg');

 /*
const connectDb = async () => {
    try {
        const pool = new Pool();
        const res = await pool.query('SELECT * from users_liste')
        console.log(res)
        await pool.end()
    } catch (error) {
        console.log(error)
    }
}
 
connectDb()
*/

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'test',
    database: 'RHUSERS'
});

client.connect();

client.query('select * from users_liste', (err, res) => {
    if(!err){
        console.log(res.rows);  
    }else{
        console.log(err.message);   
    }
    
    client.end;
});

