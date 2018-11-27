const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFixedCostInput(data) {
    let errors = {};

    data.home_rent = !isEmpty(data.home_rent) ? data.home_rent : '';
    data.maid_bill = !isEmpty(data.maid_bill) ? data.maid_bill : 0;
    data.internet_bill = !isEmpty(data.internet_bill) ? data.internet_bill : 0;
    data.cable_bill = !isEmpty(data.cable_bill) ? data.cable_bill : 0;
    data.dust_bill = !isEmpty(data.dust_bill) ? data.dust_bill : 0;
    data.newspaper_bill = !isEmpty(data.newspaper_bill) ? data.newspaper_bill : 0;
    data.gas_bill = !isEmpty(data.gas_bill) ? data.gas_bill : 0;
    data.water_bill = !isEmpty(data.water_bill) ? data.water_bill : 0;
    data.service_charge = !isEmpty(data.service_charge) ? data.service_charge : 0;
    data.extra = !isEmpty(data.extra) ? data.extra : 0;

    if (Validator.isEmpty(data.home_rent)) {
        errors.home_rent = 'Home rent field is required';
    }

    if (!Validator.isNumeric(data.home_rent)) {
        errors.home_rent = 'Home rent is interger value';
    }

    if (!Validator.isNumeric(data.maid_bill)) {
        errors.maid_bill = 'maid bill is interger value';
    }

    if (!Validator.isNumeric(data.internet_bill)) {
        errors.internet_bill = 'Internet bill is interger value';
    }

    if (!Validator.isNumeric(data.cable_bill)) {
        errors.cable_bill = 'Cable bill is interger value';
    }

    if (!Validator.isNumeric(data.dust_bill)) {
        errors.dust_bill = 'Dust bill is interger value';
    }

    if (!Validator.isNumeric(data.newspaper_bill)) {
        errors.newspaper_bill = 'Newspaper bill is interger value';
    }

    if (!Validator.isNumeric(data.gas_bill)) {
        errors.gas_bill = 'GAS bill is interger value';
    }

    if (!Validator.isNumeric(data.water_bill)) {
        errors.water_bill = 'Water bill is interger value';
    }

    if (!Validator.isNumeric(data.service_charge)) {
        errors.service_charge = 'Service charge is interger value';
    }

    if (!Validator.isNumeric(data.extra)) {
        errors.extra = 'Extra charge is interger value';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
