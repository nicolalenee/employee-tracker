const inquirer = require('inquirer');
const contab = require('console.table');
const { viewAllDepartments, addDepartment, viewAllRoles, viewAllEmployees, updateEmployee } = require('./Queries');


const promptUser = () => {
  console.log(`
  =================
      MAIN MENU
  =================
  `);


  return inquirer.prompt([
    {
      type: 'list',
      name: 'selection',
      message: 'What would you like to do?',
      choices: ['View all departments','Add a department', 'View all roles', 'Add a role', 'View all employees', 'Add an employee', 'Update an employee']
    }
  ])
};


const runCommand = menu => {
  if (menu.selection === 'View all departments') {
    viewAllDepartments();
  }
  if (menu.selection === 'Add a department') {
    addDepartment();
  }
  if (menu.selection === 'View all roles') {
    viewAllRoles();
  }
  if (menu.selection === 'View all employees') {
    viewAllEmployees();
  }
  if (menu.selection === 'Add a role') {
    addRole();
  }
  if (menu.selection === 'Add an employee') {
    addEmployee();
  }
  if (menu.selection === 'Update an employee') {
    updateEmployee();
  }

};


// export function
module.exports = { promptUser, runCommand };