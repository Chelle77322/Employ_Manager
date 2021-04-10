USE employment_managementDB;
--Populating data into the department table--
--Inserting information into the department table
INSERT INTO departments (name)
VALUES
  ("Web Design"),
  ("Software Engineering"),
  ("Accounting"),
  ("Human Resources");
INSERT INTO roles (title, salary, departments_id)
VALUES
  ("Receptionist", 50000.00, 1),
  ("Office Worker", 45000.00, 1),
  ("Front End Developer", 85000.00, 2),
  ("Software Engineer", 108000.00, 2),
  ("Payroll Clerk", 60000.00, 3),
  ("Accounts Manager", 75000.00, 3),
  ("Content Advisor", 82000.00,4);
INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES
  ("Sarina", "Gauci", 1),
  ("Saoirse", "Hall", 2,2),
  ("Alexandra", "Hasda-Hall", 3),
  ("Michelle", "Hall", 4),
  ("Max", "Cheek", 5),
  ("Connor", "Tape", 6),
  ("Brendan", "Bland", 7);