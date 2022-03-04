// import function
const { promptUser, runCommand, menuOrQuit } = require('./lib/promptUser');

// inititalize app
 promptUser()
 .then(menu => {
    runCommand(menu);
 })
 .catch(err => {
   console.log(err)
 });