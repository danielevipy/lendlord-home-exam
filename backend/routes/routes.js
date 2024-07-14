const Router = require('koa-router');
const router = new Router();

const ctrl = require('../controllers/users');

router.get('/users', ctrl.getAllUsers);
router.get('/user/:id', ctrl.getUserById);
router.post('/user', ctrl.createUser);
router.put('/user/:id', ctrl.updateUser);
router.delete('/user/:id', ctrl.deleteUser);

router.get('/manager/:id/employees', ctrl.getEmployeesByManager);
router.put(
  '/manager/:managerId/employee/:employeeId',
  ctrl.addEmployeeToManager
);

router.allowedMethods();

module.exports = router;
