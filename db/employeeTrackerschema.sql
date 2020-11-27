DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

-- Create the employees table
CREATE TABLE employees (
id INTEGER UNSIGNED AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER(10) UNSIGNED NOT NULL,
manager_id INTEGER(10) UNSIGNED NULL,
PRIMARY KEY (id),
CONSTRAINT fkey_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
CONSTRAINT fkey_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
);


-- Create the departments table
CREATE TABLE departments (
id INTEGER UNSIGNED AUTO_INCREMENT,
name VARCHAR(30) UNIQUE NOT NULL,
PRIMARY KEY (id),
);

-- Create the roles table
CREATE TABLE roles (
id INTEGER UNSIGNED AUTO_INCREMENT,
title VARCHAR(30) UNIQUE NOT NULL,
salary DECIMAL UNSIGNED NOT NULL,
department_id INT UNSIGNED NOT NULL,
PRIMARY KEY (id),
CONSTRAINT fkey_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
);



