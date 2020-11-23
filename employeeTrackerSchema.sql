DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

-- Create the employee table
CREATE TABLE employee (
id INTEGER NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER(10),
manager_id INTEGER(10),
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES employee (id)
);


-- Create the department table
CREATE TABLE department (
id INTEGER NOT NULL AUTO_INCREMENT,
name VARCHAR (30),
PRIMARY KEY (id),
);

-- Create the role table
CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INTEGER,
FOREIGN KEY (department_id) REFERENCES department(id)

);



