const UserService = require('../services/users');
const userService = new UserService();

exports.getAllUsers = async (ctx) => {
  try {
    const allUsers = await userService.getAllUsers();
    ctx.status = 200;
    ctx.body = allUsers;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
    ctx.description = 'An error occurred while retrieving all users.';
  }
};

exports.getUserById = async (ctx) => {
  const { id } = ctx.params;
  try {
    const user = await userService.getUserById(id);
    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
    ctx.description = 'An error occurred while retrieving the user by ID.';
  }
};

exports.createUser = async (ctx) => {
  try {
    const newUser = await userService.createUser(ctx.request.body);
    ctx.status = 201;
    ctx.body = newUser;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
    ctx.description = 'An error occurred while creating a new user.';
  }
};

exports.updateUser = async (ctx) => {
  const { id } = ctx.params;
  try {
    const updatedUser = await userService.updateUser(id, ctx.request.body);
    ctx.status = 200;
    ctx.body = updatedUser;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
    ctx.description = 'An error occurred while updating the user.';
  }
};

exports.deleteUser = async (ctx) => {
  const { id } = ctx.params;
  try {
    await userService.deleteUser(id);
    ctx.status = 204;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
    ctx.description = 'An error occurred while deleting the user.';
  }
};

exports.getEmployeesByManager = async (ctx) => {
  const { id } = ctx.params;
  try {
    const managerAndEmployees = await userService.getEmployeesByManager(id);
    ctx.status = 200;
    ctx.body = managerAndEmployees;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
    ctx.description =
      'An error occurred while retrieving the manager and their employees.';
  }
};

exports.addEmployeeToManager = async (ctx) => {
  const { managerId, employeeId } = ctx.params;
  try {
    const updatedManager = await userService.addEmployeeToManager(
      managerId,
      employeeId
    );
    ctx.status = 200;
    ctx.body = updatedManager;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
    ctx.description = `An error occurred while adding an employee: ${employeeId}  to the manager: ${managerId}.`;
  }
};
