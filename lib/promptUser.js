const inquirer = require('inquirer');

const promptUser = () => {
  console.log(`
  =================
      MAIN MENU
  =================
  `);


  return inquirer.prompt([
    {
      type: 'list',
      name: 'menu',
      message: 'What would you like to do?',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a role', 'Add an employee', 'Update an employee']
    }
  ])
};


// export function
module.exports = { promptUser };