const { ObjectId } = require('mongodb');
const Users = require('../lib/users');
const users = new Users();

class UserService {
  constructor() {
    users.initialize();
  }

  async getAllUsers() {
    return users.findUsers({});
  }

  async getUserById(id) {
    return users.findUser({ _id: new ObjectId(id) });
  }

  async createUser(data) {
    return users.createUser(data);
  }

  async updateUser(id, data) {
    return users.updateUser({ _id: new ObjectId(id) }, data);
  }

  async deleteUser(id) {
    return users.deleteUser({ _id: new ObjectId(id) });
  }

  async addEmployeeToManager(managerId, employeeId) {
    return users.addEmployeeToManager(
      new ObjectId(managerId),
      new ObjectId(employeeId)
    );
  }

  async getEmployeesByManager(managerId) {
    const manager = await users.findUser({
      _id: new ObjectId(managerId),
      role: 'Manager',
    });
    if (!manager) {
      throw new Error('Manager not found.');
    }
    const employees = await users.findUsers({
      managerId: new ObjectId(managerId),
    });
    return { manager, employees };
  }
}

module.exports = UserService;
