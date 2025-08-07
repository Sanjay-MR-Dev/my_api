
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testing_db',
  password: '123456789',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
}); 

module.exports = pool;



/*const { Pool } = require('pg');

const pool = new Pool ({
    user: 'postgres',
    host : '172.16.1.222',
    database : 'dbrestaurantpos',
    password : 'postgres',
    port : '5433'
});

pool.on('connect',() => {
    console.log('connected to PostgreSQL database');
});

module.exports = pool;
*/


