const inquirer = require('inquirer');
const DepartmentQuery = require('./Department');
const RoleQuery = require('./Role');
const EmployeeQuery = require('./Employee');

class App {
  constructor() {
    this.restart = false;
    this.section;
    this.query;
  }

  init() {
    console.log(`
      =================
          MAIN MENU
      =================
    `);


  inquirer.prompt({
      type: 'list',
      name: 'selection',
      message: 'What would you like to do?',
      choices: ['View all departments','Add a department', 'View all roles', 'Add a role', 'View all employees', 'Add an employee', 'Update an employee']
    })
    .then(( option ) => {
      let queryString = option.selection;

      // if the selection includes 'department' run the DepartmentQuery
      if (queryString.includes('department')) {

        this.query = new DepartmentQuery(queryString);
        this.runQuery()
      }
      // if the selection includes 'role' run the RoleQuery
      if(queryString.includes('role')) {
        this.query = new RoleQuery(queryString);
        this.runQuery();
      }
      // if the selection includes 'employee' run the EmployeeQuery
      if (queryString.includes('employee')) {
       this.query = new EmployeeQuery(queryString);
       this.runQuery();
      }
    })

  }

   runQuery() {
    const str = this.query.query;
    console.log(str)
    // query to view all entry
    if (str.includes('View')) {
      this.query.viewAll();
      // await this.continue();

    }
    // query to add an entry
    if(str.includes('Add')) {
      this.query.addNew();
      // await this.continue();
    }
    // query to update an entry
    if(str.includes('Update')) {
      this.query.update();
    }
  }

continue () {
     return inquirer.prompt({
      type: 'confirm',
      name: 'restart',
      message: 'Would you like to run another query?',
      default: false
    }).then(( status ) => {
      this.restart = status.restart;
      // if the user selected to run another query, restart the app and return to the main menu
      if (this.restart === true) {
        console.log('Restarting . . . ')
        this.init();
      }
      // if the user selected not to run another query, send an exit message and return
      if (this.restart === false) {
        console.log('See ya!');
        return;
      }
    })
  }
}

module.exports = App;