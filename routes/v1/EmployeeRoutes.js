// routes/EmployeeRoutes.js
const express = require('express');
const router = express.Router();
const EmployeeController = require('../../controllers/EmployeeController');

router.post('/Employee', EmployeeController.createNewEmployee);
router.put('/Employee/updatePosition/:id', EmployeeController.updateEmployeePosition);
router.get('/Employee', EmployeeController.getAllEmployee);
router.get('/Employee/withoutuser', EmployeeController.getEmployeeWithoutUser);
router.get('/Employee/loggedin', EmployeeController.getEmployeeLoggedIn);
router.get('/Employee/:id', EmployeeController.getEmployeeById);
router.delete('/Employee/:id', EmployeeController.deleteEmployee);

module.exports = router;
