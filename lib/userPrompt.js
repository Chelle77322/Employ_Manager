class employeeView {
    viewAll() {
      const query = "SELECT * FROM employees";
      connection.query(query, (err, res) => {
        console.table(res);
      });
    }
  }
  
  module.exports = employeeView;