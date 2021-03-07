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
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(10),
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
CONSTRAINT fk_employee FOREIGN KEY (manager_id) References employee(id) on delete set null
CONSTRAINT fk_role FOREIGN KEY(role_id) References role(role_id)
);


INSERT INTO  department (dep_name)
VALUES ('Human Resources'), ('Operations'), ('Web Developing'), ('Software Development'), ('Accounting');

INSERT INTO role (title, salary, dep_id)
VALUES
    ('HR Manager', 88000, 3), ('Operations Manager', 95000, 2),
    ('Full Stack Developer', 110000, 1), ('Software Engineer', 120000, 1),
     ('Accounts Manager', 88000, 3),('Web Developer', 90000, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Simone', 'Hasda',3, NULL), ('Max', 'Paparella', 2, NULL), ('Michelle', 'Hall', 1,NULL);
