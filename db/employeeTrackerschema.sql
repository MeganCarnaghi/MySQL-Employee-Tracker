DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT,
  name VARCHAR(30) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dept_index (department_id),
  CONSTRAINT fkey_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_index (role_id),
  CONSTRAINT fkey_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX mgr_index (manager_id),
  CONSTRAINT fkey_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);



