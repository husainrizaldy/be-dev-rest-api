// utils/validator.js
const isInteger = (value) => {
    return Number.isInteger(Number(value));
};

const isNotEmpty = (value) => {
    return value !== undefined && value !== null && value !== '';
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

module.exports = {
    isInteger,
    isNotEmpty,
    isValidEmail
};