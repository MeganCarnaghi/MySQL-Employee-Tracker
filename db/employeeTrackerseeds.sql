USE employee_trackerDB;

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Karen", "Short", "1", "9");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lisa", "Matthews", "2", "1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Harding", "3", "9");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Edward", "Smith", "4", "3");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tina", "Barclay", "5", "null");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alex", "Nash", "6", "5");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Wendy", "Curtis", "7", "3");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Natalie", "Sutka", "8", "7");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Megan", "Carnaghi", "9", "null");

-- Insert data into the department table
INSERT INTO department (name)
VALUES ("Marketing");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Customer Service");

-- Insert data into the role table

INSERT INTO role (title, salary, department_id)
VALUES ("Director of Marketing", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Social Media Specialist", 60000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Director of Sales", 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Account Executive", 80000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Egineering Manager", 100000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Full Stack Developer", "90000", 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Customer Service Manager", "100000", 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Customer Service Specialist", "50000", 4);

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", "500000", "null");


