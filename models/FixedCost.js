const mongoose = require('mongoose');
var moment = require('moment');
const Schema = mongoose.Schema;

//create schema
const fixedcostSchema = new Schema({
    home_rent: {
        type: Number,
        required: true,
        default: 0
    },
    maid_bill: {
        type: Number,
        default: 0
    },
    internet_bill: {
        type: Number,
        default: 0
    },
    cable_bill: {
        type: Number,
        default: 0
    },
    dust_bill: {
        type: Number,
        required: true,
        default: 0
    },
    newspaper_bill: {
        type: Number,
        default: 0
    },
    gas_bill: {
        type: Number,
        default: 0
    },
    water_bill: {
        type: Number,
        default: 0
    },
    service_charge: {
        type: Number,
        default: 0
    },
    extra: {
        type: Number,
        default: 0
    },
    note: {
        type: String,
        default: null
    },
    month_year: {
        type: Number,
        default: moment().format('MM_Y')
    },
    entry_date: {
        type: Date,
        default: Date.now
    },
    entry_by: {
        type: Number,
        required: true
    }

});
module.exports = FixedCost = mongoose.model('fixed_cost', fixedcostSchema);
