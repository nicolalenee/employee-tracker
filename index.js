// import function
const { promptUser, runCommand } = require('./lib/promptUser');


// inititalize app
 promptUser()
 .then(menu => {
  return runCommand(menu);
 })