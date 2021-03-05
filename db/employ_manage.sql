DROP DATABASE IF EXISTS employment_managementDB;
CREATE DATABASE employment_managementDB;
USE employment_managementDB;
DROP TABLE IF EXISTS department;
CREATE TABLE department
( 
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
dep_name VARCHAR(30)
);
DROP TABLE IF EXISTS role;
CREATE TABLE role
(
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL(10),
PRIMARY KEY(role_id),
dep_id INT NOT NULL,
CONSTRAINT fk_department FOREIGN KEY (dep_id) References department(id) on delete cascade
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee
(
id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
CONSTRAINT fk_department FOREIGN KEY (manager_id) References employee(id) on delete set null
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
