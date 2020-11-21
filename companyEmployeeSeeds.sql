DROP DATABASE IF EXISTS company_employeesDB;

CREATE DATABASE company_employeesDB;

USE company_employeesDB;

-- Create the employee table
CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY (id),
FOREIGN KEY (role_id),
FOREIGN KEY (manager_id)
);

-- Create the department table
CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR (30),
PRIMARY KEY (id),
);

-- Create the role table
CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL(6,2),
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id)
);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("", "", "");

-- Insert data into the department table
INSERT INTO department (name)
VALUES ("", "", "");

-- Insert data into the role table
INSERT INTO role (title, salary, department_id)
VALUES ("", "", "");


