


-- Creating the department table with an auto incrementing id field--
CREATE TABLE department
(
id INTEGER(11) AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);
-- Creating the role table with an auto incrementing id field and using department_id as foreign key.
CREATE TABLE role
(
id INTEGER(11) AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10) NOT NULL,
PRIMARY KEY (id),
department_id INTEGER(11) NOT NULL,
FOREIGN KEY (department_id) REFERENCES department(department.id)
);
--Creating the employee table with an auto incrementing id field and using role_id linked to the role table and manager_id linked to the employee table as foreign keys
CREATE TABLE employee
(
id INTEGER(11) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30), NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role(role.id),
FOREIGN KEY (manager_id) REFERENCES employee(employee.id)
);


