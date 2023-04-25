const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole} = require('./server');

function startApp() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ]).then((answers) => {
    switch (answers.action) {
      case 'View all departments':
        viewAllDepartments() .then(() => {
        startApp()});
        break;

      case 'View all roles':
        // call viewAllRoles function here
        viewAllRoles()
        .then(() => {
            startApp()});
        break;
      case 'View all employees':
        // call viewAllEmployees function here
        viewAllEmployees().then(() => {
            startApp()});
        break;

      case 'Add a department':
        inquirer.prompt([{type: 'input',
        name: 'department',
        message: "What department would you like to add?"}])
        .then((answers) => {
            addDepartment(answers.department).then(() => {
                startApp()});
        });
        
        break;

      case 'Add a role':
        inquirer.prompt([
        {type: 'input',
        name: 'role',
        message: "What is the name of the new role?"}, 
        {type: 'input',
         name: 'salary',
         message: 'What is the salary of this new role?'    
        },
        {type: 'input',
        name: 'department',
        message: 'What department is this new role in?'
        }    
    ])
        .then((answers) => {
            addRole(answers.role, answers.salary, answers.department).then(() => {
                startApp()});
        });
        // call addRole function here
       
        break;
      case 'Add an employee':
        // call addEmployee function here
        inquirer.prompt([
            {type: 'input',
            name: 'first_name',
            message: "What is the first name of the new employee?"}, 
            {type: 'input',
             name: 'last_name',
             message: 'What is the last name of this new employee?'    
            },
            {type: 'input',
            name: 'role',
            message: 'What role is this new employee in?'
            },   
            {type: 'input',
            name: 'manager',
            message: 'Who is the new employees manager?'
            }   
        ])
        .then((answers) => {
            addEmployee(answers.first_name, answers.last_name, answers.role, answers.manager).then(() => {
                startApp()});
        })
        break;
      case 'Update an employee role':
        // call updateEmployeeRole function here
        viewAllEmployees().then((employees) => {
            const employeeChoices = employees.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            }));
            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'employeeId',
                  message: 'Select an employee to update:',
                  choices: employeeChoices,
                },
                {
                  type: 'input',
                  name: 'roleId',
                  message: 'Enter the ID of the new role:',
                },
              ])
              .then((answers) => {
                updateEmployeeRole(answers.employeeId, answers.roleId);
                console.log('Employee role updated successfully!');
                startApp();
              })
              .catch((error) => {
                console.log('Error updating employee role:', error);
                startApp();
              });
          });
        // updateEmployeeRole();
        break;
      case 'Exit':
        connection.end();
        process.exit();
    }
  });
}

startApp();
