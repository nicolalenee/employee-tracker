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

// roleQuery constructor class
class RoleQuery {
  constructor(query="") {
    this.query = query;
  }

  // query to view all roles
  viewAll() {
    let sql = `SELECT roles.*, departments.name AS department
              FROM roles
              LEFT JOIN departments ON roles.department_id = departments.id`;

    db.promise().query(sql).then(([rows, fields]) => {
      console.table(rows)
    })
    .catch(err => console.log(err))
  }

  addNew() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the job title for this role?',
        validate: (titleInput) => {
          if (titleInput) {
            return true;
          } else {
            console.log(`Please enter the title for this role!`)
            return false;
          }
        }
      },
      {
        type: 'number',
        name: 'salary',
        message: 'What is the salary for this position?',
        validate: (salaryInput) => {
          if (salaryInput) {
            return true;
          } else {
            console.log('Please enter a valid salary for this position!')
            return false;
          }
        }
      },
      {
        type: 'number',
        name: 'departmentRole',
        message: 'Please enter the department ID for this role',
        validate: (departmentRoleInput) => {
          if (departmentRoleInput) {
            return true;
          } else {
            console.log('Please enter a current department ID! The department must already exist.')
            return false;
          }
        }
      }
    ]).then((newRoleInfo) => {
      let sql = `INSERT INTO roles (job_title, salary, department_id)
                VALUES
                ('${newRoleInfo.title}','${newRoleInfo.salary}', ${newRoleInfo.departmentRole})
              `;
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
        }
        console.table(newRoleInfo);
      })
    })
  }
}

module.exports = RoleQuery;