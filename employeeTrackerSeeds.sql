USE employee_trackerDB;

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("", "", "");

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
VALUES ("manager", 100000, 1);

-- Insert data into the role table
INSERT INTO role (title, salary, department_id)
VALUES ("social media specialist", 60000, 1);

-- Insert data into the role table
INSERT INTO role (title, salary, department_id)
VALUES ("manager", 100000, 2);

-- Insert data into the role table
INSERT INTO role (title, salary, department_id)
VALUES ("account executive", 80000, 2);

-- Insert data into the role table
INSERT INTO role (title, salary, department_id)
VALUES ("manager", 100000, 3);

-- Insert data into the role table
INSERT INTO role (title, salary, department_id)
VALUES ("full stack developer", "90000", 3);

-- Insert data into the role table
INSERT INTO role (title, salary, department_id)
VALUES ("manager", "100000", 4);

-- Insert data into the role table
INSERT INTO role (title, salary, department_id)
VALUES ("customer service specialist", "50000", 4);


