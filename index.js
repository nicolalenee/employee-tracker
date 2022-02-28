// import function
const { promptUser } = require('./lib/promptUser');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '${SunFlower29}',
    database: 'employee_tracker'
  },
  console.log('Connected to the employee_tracker database')
)

// db.query(`SELECT * FROM departments`, (err, rows) => {
//   console.log(rows)
// });

// inititalize app
// promptUser();