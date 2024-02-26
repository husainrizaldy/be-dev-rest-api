// models/EmployeeModel.js
const db = require('../config/db');

const getAllEmployee = () => {
    return new Promise((resolve, reject) => {
        try {
            const query = `
                SELECT
                    tk.id_karyawan,
                    tk.nama_karyawan,
                    tk.email,
                    tk.alamat,
                    tu.nama_unit,
                    ts.salary
                FROM
                    t_karyawan tk
                JOIN t_unit tu ON tk.id_unit = tu.id_unit
                JOIN t_jabatan tj ON tk.id_jabatan = tj.id_jabatan
                JOIN t_salary ts ON tj.id_salary = ts.id_salary
                ORDER BY tk.id_karyawan;
            `;

            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getEmployeeById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `
                SELECT
                    tk.id_karyawan,
                    tk.nama_karyawan,
                    tk.email,
                    tk.alamat,
                    tu.nama_unit,
                    ts.salary
                FROM
                    t_karyawan tk
                JOIN t_unit tu ON tk.id_unit = tu.id_unit
                JOIN t_jabatan tj ON tk.id_jabatan = tj.id_jabatan
                JOIN t_salary ts ON tj.id_salary = ts.id_salary
                WHERE tk.id_karyawan = ?;
            `;

            db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length > 0) {
                        resolve(results[0]);
                    } else {
                        reject({ message: 'Employee not found' });
                    }
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getEmployeeWithoutUser = () => {
    return new Promise((resolve, reject) => {
        try {
            const query = `
                SELECT
                    tk.id_karyawan,
                    tk.nama_karyawan,
                    tk.email,
                    tk.alamat,
                    tu.nama_unit,
                    ts.salary
                FROM
                    t_karyawan tk
                JOIN t_unit tu ON tk.id_unit = tu.id_unit
                JOIN t_jabatan tj ON tk.id_jabatan = tj.id_jabatan
                JOIN t_salary ts ON tj.id_salary = ts.id_salary
                LEFT JOIN t_user tus ON tk.id_karyawan = tus.id_karyawan
                WHERE tus.id_user IS NULL
                ORDER BY tk.id_karyawan;
            `;

            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getEmployeeLoggedIn = () => {
    return new Promise((resolve, reject) => {
        try {
            const query = `
                SELECT
                    tk.id_karyawan,
                    tk.nama_karyawan,
                    tk.email,
                    tu.nama_unit,
                    tj.nama_jabatan
                FROM
                    t_karyawan tk
                JOIN t_unit tu ON tk.id_unit = tu.id_unit
                JOIN t_jabatan tj ON tk.id_jabatan = tj.id_jabatan
                JOIN t_user tus ON tk.id_karyawan = tus.id_karyawan
                WHERE tus.login = 1;
            `;

            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

const validateEmployeeId = async (id) => {
    return new Promise((resolve, reject) => {
        const checkEmployeeQuery = 'SELECT id_karyawan FROM t_karyawan WHERE id_karyawan = ?';
        db.query(checkEmployeeQuery, [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                results.length === 0 ? reject({ type: 'not_found_employee', message: 'Employee not found' }) : resolve(true);
            }
        });
    });
};

const validateJobPositionId = async (id) => {
    return new Promise((resolve, reject) => {
        const checkJabatanQuery = 'SELECT id_jabatan FROM t_jabatan WHERE id_jabatan = ?';
        db.query(checkJabatanQuery, [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                results.length === 0 ? reject({ type: 'not_found_job_position', message: 'Job position not found' }) : resolve(true);
            }
        });
    });
};
const validateUnitId = async (id) => {
    return new Promise((resolve, reject) => {
        const checkUnitQuery = 'SELECT id_unit FROM t_unit WHERE id_unit = ?';
        db.query(checkUnitQuery, [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                results.length === 0 ? reject({ type: 'not_found_unit', message: 'Unit not found' }) : resolve(true);
            }
        });
    });
};

const updateEmployeePosition = async (idEmployee, idJabatan) => {
    try {
        await validateEmployeeId(idEmployee);
        await validateJobPositionId(idJabatan);
        const updateResult = await performUpdateEmployeePosition(idEmployee, idJabatan);
        return updateResult;
    } catch (error) {
        throw error;
    }
};

const performUpdateEmployeePosition = async (idEmployee, idJabatan) => {
    return new Promise((resolve, reject) => {
        const updateQuery = 'UPDATE t_karyawan SET id_jabatan = ? WHERE id_karyawan = ?';
        db.query(updateQuery, [idJabatan, idEmployee], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const createNewEmployee = (newEmployee) => {
    return new Promise((resolve, reject) => {
        const insertQuery = 'INSERT INTO t_karyawan SET ?';

        db.query(insertQuery, newEmployee, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const deleteEmployee = (id, callback) => {
    db.query('DELETE FROM t_karyawan WHERE id_karyawan = ?', [id], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

module.exports = {
    getAllEmployee,
    getEmployeeById,
    getEmployeeWithoutUser,
    getEmployeeLoggedIn,
    updateEmployeePosition,
    validateJobPositionId,
    validateUnitId,
    createNewEmployee,
    deleteEmployee
};
