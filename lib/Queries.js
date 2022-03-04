const mysql = require('mysql2');

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

const addDepartment = () => {
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
    db.query(sql, async (err, row) => {
      if (err) {
        console.log(err);
      }
      console.table(row);
    })
  })
};

const viewAllRoles = () => {
  let sql = `SELECT roles.*, departments.name AS department
              FROM roles
              RIGHT JOIN departments ON roles.department_id = departments.id`;

  db.query(sql, async (err, rows) => {
    console.table(rows);
  })
};

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
  db.query(sql, async (err, rows) => {
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
    db.query(sql, async(err, row) => {
      if (err) {
        console.log(err);
      }
      console.table(row);
    })
  })
};


module.exports = {
  viewAllDepartments,
  addDepartment,
  viewAllRoles,
  viewAllEmployees,
  updateEmployee
};