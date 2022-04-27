const mysql = require('mysql2')
const inquirer = require('inquirer');
const contab = require('console.table')

// establish a connection to our database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Sunflower29',
    database: 'employee_tracker',
    port: 3306
  }
);


// departmentQuery constructor class
class DepartmentQuery {
  constructor(query="") {
    this.query = query;
  }

  // query to view all departments
  viewAll() {
    console.log(this.query)
    if (this.query === "View all departments") {
      let sql = `SELECT * FROM departments`
      db.promise().query(sql).then(([rows,fields]) => {
        console.table(rows)
      })
      .catch(err => console.log(err))
    }
  }
  // query to add a new department
  addNew() {
    if (this.query === "Add a department") {
      return inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of the department?',
          validate: (departmentNameInput) => {
            if (departmentNameInput) {
              return true;
            } else {
              console.log("Please enter the department's name before continuing.")
            }
          }
        }
      ]).then(departmentInfo => {
        let sql = `INSERT INTO departments (name)
                  VALUES
                  ('${departmentInfo.name}')`;
        db.promise().query(sql).then(([rows, fields]) => {
          console.table([
            {
              'department name': departmentInfo.name
            }
          ])})
          .catch(err => console.log(err))
        })
    }
  }
}

module.exports = DepartmentQuery;