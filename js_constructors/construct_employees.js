//* Constructor for employee
class employees {
	constructor(first_name, last_name, roles_id, manager_id) {
		this.first_name = first_name;
		this.last_name = last_name;
		this.roles_id = roles_id;
		this.manager_id = manager_id;
	}
}

module.exports = employees;