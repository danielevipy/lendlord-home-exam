const UserModel = require('../models/users');

class UsersRepo {
  async find(query, projection = {}) {
    return UserModel.find(query, projection);
  }

  async findOne(query, projection = {}) {
    return UserModel.findOne(query, projection).populate('employees');
  }

  async insertOne(data) {
    const user = new UserModel(data);
    return user.save();
  }

  async updateOne(query, data) {
    return UserModel.findOneAndUpdate(query, data, { new: true }).populate(
      'employees'
    );
  }

  async deleteOne(query) {
    return UserModel.findOneAndDelete(query);
  }

  async addEmployeeToManager(managerId, employeeId) {
    return UserModel.findOneAndUpdate(
      { _id: managerId, role: 'Manager' },
      { $push: { employees: employeeId } },
      { new: true }
    ).populate('employees');
  }
}

module.exports = UsersRepo;
