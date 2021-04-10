-- Schema
DROP DATABASE IF EXISTS employment_managementDB;
CREATE DATABASE employment_managementDB;
USE employment_managementDB;
--Department Table
CREATE TABLE departments (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);
--Employee Role Table
CREATE TABLE roles (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary decimal NOT NULL,
  departments_id int,
  PRIMARY KEY (id)
  
);
--Employee Table
CREATE TABLE employees (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  roles_id int,
  manager_id int,
  PRIMARY KEY (id)
);
SELECT * FROM employement_managementDB;