const express = require('express');
// Import and require mysql2
// const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table')

const PORT = process.env.PORT || 3001;
const app = express();

const mysql = require('mysql2/promise');

// create the connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'passpass1',
  database: 'company_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// function to view all departments
async function viewAllDepartments() {
  console.log('viewing all departments')
  const [rows, fields] = await pool.query('SELECT id, name FROM department');
  console.table(rows)
  return rows;
}

// function to view all roles
async function viewAllRoles() {
  const [rows, fields] = await pool.query('SELECT role.id, title, salary, department.name AS department FROM role JOIN department ON role.department_id = department.id');
  console.table(rows)
  return rows;
}

// function to view all employees
async function viewAllEmployees() {
  const [rows, fields] = await pool.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                                            FROM employee 
                                            JOIN role ON employee.role_id = role.id 
                                            JOIN department ON role.department_id = department.id 
                                            LEFT JOIN employee manager ON employee.manager_id = manager.id`);
    console.table(rows)
  return rows;
}

// function to add a department
async function addDepartment(name) {
  const [rows, fields] = await pool.query('INSERT INTO department (name) VALUES (?)', [name]);
  return rows;
}

// function to add a role
async function addRole(title, salary, departmentId) {
  const [rows, fields] = await pool.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  return rows;
}

// function to add an employee
async function addEmployee(firstName, lastName, roleId, managerId) {
  const [rows, fields] = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  return rows;
}

// function to update an employee's role
async function updateEmployeeRole(employeeId, roleId) {
  const [rows, fields] = await pool.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  return rows;
}

// export the functions for use in other modules
module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
