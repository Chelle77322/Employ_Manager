class employeesView {
    viewAll() {
      const query = "SELECT * FROM employees";
      connection.query(query, (error, result) => {
        console.table(result);
      });
    }
  }
  class rolesView{
    viewAll() {
      const query = "SELECT * FROM roles";
      connection.query(query, (error, result) => {
        console.table(result);
      });
    }

  }
  class departmentsView{
    viewAll() {
      const query = "SELECT * FROM departments";
      connection.query(query, (error, result) => {
        console.table(result);
      });
    }

  }
  
  module.exports = employeesView;
  module.exports = rolesView;
  module.exports = departmentsView;