async function menuViewDepartments(){
    const departmentData = await orm.selectDepartment(department.id);
    console.table(departmentData);
    return startMenu();
   
  }