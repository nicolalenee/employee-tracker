const mysql = require('mysql2');
const contab = require('console.table');
const inquirer = require('inquirer');


const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '${SunFlower29}',
    database: 'employee_tracker'
  },
  console.log('Connected to the employee_tracker database')
);

const viewAllDepartments = () => {
   let sql = `SELECT * FROM departments`;

   db.query(sql, (err, rows) => {
     console.table(rows);
   });
};


// const viewAllDepartments = async () => {
//   let sql = `SELECT * FROM departments`;

//   db.promise().query(sql).then(([rows, fields]) => {
//     console.log(rows)
//     console.table(fields);
//   }).then(() => db.end());
// };

const addDepartment = async () => {
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
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      }
      console.table(rows);
    })
  })
};

const viewAllRoles = () => {
  let sql = `SELECT roles.*, departments.name AS department
              FROM roles
              LEFT JOIN departments ON roles.department_id = departments.id`;

  db.query(sql, (err, rows) => {
    console.table(rows);
  })
}


const addRole = () => {
  return inquirer.prompt([
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
      console.table(rows);
    })
  })
}

const viewAllEmployees = () => {

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
  db.query(sql, (err, rows) => {
    console.table(rows);
  })
};

const updateEmployee = () => {
  return inquirer.prompt([
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
      type: 'input',
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
              SET role_id = ${newRole}
              WHERE employees.id = ${employeeId}`;
    db.query(sql, (err, row) => {
      if (err) {
        console.log(err);
      }
      console.table(row);
    })

     
  })
};


const menuOrQuit = () => {
  return inquirer.prompt({
    type: 'confirm',
    name: 'continue',
    message: 'Return to the main menu?',
    validate: (optionInput) => {
      if (optionInput) {
        return true;
      } else {
        console.log('Please make a selection.');
        return false;
      }
    }
  }).then((selectedOption) => {
    if (selectedOption.continue === true) {
      promptUser();
    } else {
      console.log('Goodbye!')
      return;
    }
  })
};


module.exports = {
  viewAllDepartments,
  addDepartment,
  viewAllRoles,
  addRole,
  viewAllEmployees,
  updateEmployee
};