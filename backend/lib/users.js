const UsersRepo = require('../repository/users');

class Users {
  initialize() {
    this.repo = new UsersRepo();
  }

  async findUsers(query, projection = {}) {
    return this.repo.find(query, projection);
  }

  async findUser(query, projection = {}) {
    return this.repo.findOne(query, projection);
  }

  async createUser(data) {
    return this.repo.insertOne(data);
  }

  async updateUser(query, data) {
    return this.repo.updateOne(query, data);
  }

  async deleteUser(query) {
    return this.repo.deleteOne(query);
  }

  async addEmployeeToManager(managerId, employeeId) {
    return this.repo.addEmployeeToManager(managerId, employeeId);
  }
}

module.exports = Users;
