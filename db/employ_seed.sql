USE employment_managementDB;
--Populating data into the department table--
INSERT INTO department (name)
VALUES ('Finance'), ('Software Development'), ('Human Resources'), ('Production'), ('Web Design');

--Populating data into the role table --
INSERT INTO role (title, salary, department_id)
VALUES ('Account Manager', 95000, 1), ('Payroll Administrator', 85000, 1),('Accounts Payable', 80000, 1),('Full-stack Developer', 120000, 2),('Front-end Developer', 105000, 2), ('Programmer', 110000, 2), ('Web Manager', 85000, 3), ('Web Designer', 75000, 3), ('Content Administrator', 65000, 3),('HR Manager', 90000, 4), ('Receptionist', 60000, 4), ('Executive Assistant', 62000, 4);

--Populating data into the employee table

INSERT INTO employee (first_name, last_name role_id, manager_id)
VALUES ('Simone','Hasda', 1,1), ('Emma','Paparella', 1, NULL), ('Tayla','Heitmann', 1,NULL), ('Michelle','Hall', 2, 2), ('Saoirse','Hall', 2, NULL), ('Acelyn','Bland' 2, NULL), ('Max', 'Paparella',3,3), ('Samantha','Weinert', 3, NULL), ('Oscar', 'Smith', 4, NULL), ('Brendan', 'Bland', 4, NULL);