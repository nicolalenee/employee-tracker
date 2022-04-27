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

class EmployeeQuery{
  constructor(query="") {
    this.query = query;
  }

  viewAll() {
     // this query is my pride and joy. thank you.
  let sql = `SELECT main.*,
  manager.first_name AS manager_firstname,manager.last_name AS manager_lastname,
  roles.salary AS salary,
  roles.job_title AS role,
  departments.name AS department
  FROM employees main
  LEFT JOIN employees manager ON main.manager_id = manager.manager_id
  LEFT JOIN roles ON manager.role_id = roles.id
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
        name: 'firstName',
        message: "What is the employee's first name?",
        validate: (firstNameInput) => {
          if (firstNameInput) {
            return true;
          } else {
            console.log("Please enter the employee's first name")
            return false;
          }
        }
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
        validate: (lastNameInput) => {
          if (lastNameInput) {
            return true;
          } else {
            console.log("Please enter the employee's last name.")
            return false;
          }
        }
      },
      {
        type: 'number',
        name: "managerId",
        message: "What's the employee manager's Id?",
        validate: (managerIdInput) => {
          if (managerIdInput) {
            return true;
          } else {
            console.log("Please enter a valid managagr ID")
            return false;
          }
        }
      },
      {
        type: 'number',
        name: 'roleId',
        message: "What's the ID for the employee's role?",
        validate: (roleIdInput) => {
          if (roleIdInput) {
            return true;
          } else {
            console.log('Please enter a valid role ID')
            return false
          }
        }
      }
    ]).then((newEmployeeInfo) => {
      let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES
        ('${newEmployeeInfo.firstName}', '${newEmployeeInfo.lastName}', '${newEmployeeInfo.roleId}', '${newEmployeeInfo.managerId}')
        `;
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err)
        }
        console.table(newEmployeeInfo);
      })
    })
  }

  update() {
    inquirer.prompt([
          {
            type: 'number',
            name: 'employeeId',
            message: 'Enter the employee ID of the employee you want to update:',
            validate: (employeeIdInput) => {
              if (employeeIdInput) {
                return true;
              } else {
                console.log(`Please enter a valid employee ID.`)
                return false;
              }
            }
          },
          {
            type: 'number',
            name: 'newRole',
            message: "Enter the employee's new role ID",
            validate: (newRoleInput) => {
              if (newRoleInput) {
                return true;
              } else {
                console.log('Please enter a valid role ID');
                return false;
      
              }
            }
          }
        ]).then(updatedInfo => {
          let sql = `UPDATE employees
                    SET role_id = ${updatedInfo.newRole}
                    WHERE employees.id = ${updatedInfo.employeeId}`;
          db.query(sql, (err, row) => {
            if (err) {
              console.log(err);
            }
            console.table(updatedInfo);
          })
      
           
        })
  }
}

module.exports = EmployeeQuery;