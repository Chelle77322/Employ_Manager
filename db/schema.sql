-- Schema
DROP DATABASE IF EXISTS employment_managementDB;
CREATE DATABASE employment_managementDB;
USE employment_managementDB;
--Department Table
CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);
--Employee Role Table
CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary decimal NOT NULL,
  department_id int,
  PRIMARY KEY (id)
  
);
--Employee Table
CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int,
  manager_id int,
  PRIMARY KEY (id)
);
SELECT * FROM employees_db;