DROP DATABASE IF EXISTS employment_managementDB;
CREATE DATABASE employment_managementDB;
USE employment_managementDB;
CREATE TABLE department
( 
dep_id INT AUTO_INCREMENT NOT NULL,
dep_name VARCHAR(30),
PRIMARY KEY (dep_id)
);
CREATE TABLE role
(
role_id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL,
PRIMARY KEY(role_id),
FOREIGN KEY(dep_id) REFERENCES department(dep_id)
);
CREATE TABLE employee
(
employee_id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
manager_id INT NOT NULL,
PRIMARY KEY (employee_id),
FOREIGN KEY (role_id) REFERENCES role(role_id),
FOREIGN KEY (manager_id) REFERENCES employee(manager_id)
);
INSERT INTO  department (dep_name)
VALUES ('Human Resources'), ('Operations'), ('Web Developing'), ('Software Development'), ('Accounting');

INSERT INTO role (title, salary, dep_id)
VALUES
    ('HR Manager', 88000, 3), ('Operations Manager', 95000, 4),
    ('Full Stack Developer', 110000, 2), ('Software Engineer', 120000, 1),
     ('Accounts Manager', 88000, 6),('Web Developer', 90000, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Simone', 'Hasda',3, NULL), ('Max', 'Paparella', 3, NULL), ('Michelle', 'Hall', 2, 1);
