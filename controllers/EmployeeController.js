// controllers/EmployeeController.js
const EmployeeModel = require('../models/EmployeeModel');
const responseHandler = require('../utils/responseHandler');
const validator = require('../utils/validator');

const getAllEmployee = async (req, res) => {
    try {
        const results = await EmployeeModel.getAllEmployee();
        responseHandler.successResponse(res, results);
    } catch (error) {
        console.error('Error: ' + error.message);
        responseHandler.errorResponse(res, 500, 'Internal Server Error');
    }
};

const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    if (!validator.isInteger(id)) {
        return responseHandler.errorResponse(res, 400, 'Invalid params.');
    }
    try {
        const result = await EmployeeModel.getEmployeeById(id);
        if (result !== null) {
            responseHandler.successResponse(res, result);
        } else {
            responseHandler.notFoundResponse(res, 'Employee not found');
        }
    } catch (error) {
        console.error('Error: ' + error.message);
        responseHandler.errorResponse(res, 500, error.message);
    }
};

const getEmployeeWithoutUser = async (req, res) => {
    try {
        const results = await EmployeeModel.getEmployeeWithoutUser();
        responseHandler.successResponse(res, results);
    } catch (error) {
        console.error('Error: ' + error.message);
        responseHandler.errorResponse(res, 500, error.message);
    }
};

const getEmployeeLoggedIn = async (req, res) => {
    try {
        const results = await EmployeeModel.getEmployeeLoggedIn();
        responseHandler.successResponse(res, results);
    } catch (error) {
        console.error('Error: ' + error.message);
        responseHandler.errorResponse(res, 500, error.message);
    }
};

const updateEmployeePosition = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_jabatan } = req.body;
        if (!validator.isInteger(id)) {
            return responseHandler.errorResponse(res, 400, 'Invalid params.');
        }
        if (!validator.isInteger(id_jabatan)) {
            return responseHandler.errorResponse(res, 400, 'Invalid. id_Jabatan must be an integer.');
        }
        const result = await EmployeeModel.updateEmployeePosition(id, id_jabatan);
        responseHandler.successResponse(res, 'Employee position has been updated');
    } catch (error) {
        console.error('Error: ' + error.message);
        if (error.type === 'not_found_employee' || error.type === 'not_found_job_position') {
            responseHandler.notFoundResponse(res, error.message);
        } else {
            responseHandler.errorResponse(res, 500, error.message);
        }
    }
};

const createNewEmployee = async (req, res) => {
    try {
        const { nama_karyawan, email, id_unit, id_jabatan, alamat } = req.body;

        if (!nama_karyawan || !email || !id_unit || !id_jabatan || !alamat) {
            return responseHandler.errorResponse(res, 400, 'All fields are required');
        }

        if (!validator.isValidEmail(email)) {
            return responseHandler.errorResponse(res, 400, 'Invalid email format');
        }

        try {
            await EmployeeModel.validateUnitId(id_unit);
        } catch (error) {
            return responseHandler.errorResponse(res, 400, error.message);
        }

        try {
            await EmployeeModel.validateJobPositionId(id_jabatan);
        } catch (error) {
            return responseHandler.errorResponse(res, 400, error.message);
        }
        const result = await EmployeeModel.createNewEmployee({
            nama_karyawan,
            email,
            id_unit,
            id_jabatan,
            alamat,
        });

        return responseHandler.successResponse(res, 'Employed added successfully');
    } catch (error) {
        console.error('Error: ' + error.message);
        return responseHandler.errorResponse(res, 500, error.message);
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const existingEmployee = await EmployeeModel.getEmployeeById(id);
        if (!existingEmployee) {
            return responseHandler.notFoundResponse(res, 'Employee not found');
        }
        await EmployeeModel.deleteEmployee(id);
        return responseHandler.successResponse(res, 'Employed deleted successfully');
    } catch (error) {
        console.error('Error: ' + error.message);
        return responseHandler.errorResponse(res, 500, error.message);
    }
}


module.exports = {
    getAllEmployee,
    getEmployeeById,
    getEmployeeWithoutUser,
    getEmployeeLoggedIn,
    updateEmployeePosition,
    createNewEmployee,
    deleteEmployee
};
