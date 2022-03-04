const inquirer = require('inquirer');
const { viewAllDepartments, addDepartment, viewAllRoles, addRole, viewAllEmployees, updateEmployee } = require('./Queries');

// function that starts the prompts for the user
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

// function that houses the functions that create queries based on what the user selected in the first prompt
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

// function that gives users the option to return to the main menu or quit the application
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
}


// export function
module.exports = { promptUser, runCommand, menuOrQuit };