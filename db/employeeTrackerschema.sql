DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

-- Create the employees table
CREATE TABLE employees (
id INTEGER AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER(10) NOT NULL,
manager_id INTEGER(10) NULL,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES employee (id)
);


-- Create the departments table
CREATE TABLE departments (
id INTEGER AUTO_INCREMENT NOT NULL,
name VARCHAR (30) NOT NULL,
PRIMARY KEY (id),
);

-- Create the roles table
CREATE TABLE roles (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
department_id INTEGER NOT NULL,
-- FOREIGN KEY (department_id) REFERENCES department(id)

);



