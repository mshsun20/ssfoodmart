const mongoose = require('mongoose');

const AccSchema = mongoose.Schema({
    acc_name: {
        type: String,
        required: true,
        unique: true
    },
    acc_email: {
        type: String,
        required: true,
        unique: true
    },
    acc_pass: {
        type: String,
        required: true
    },
    acc_phn: {
        type: Number,
        required: true,
        unique: true
    },
    acc_fname: {
        type: String,
        required: true
    },
    acc_cntry: {
        type: String,
        required: true
    },
    acc_state: {
        type: String,
        required: true
    },
    acc_dist: {
        type: String
    },
    acc_cty: {
        type: String
    },
    acc_addr: {
        type: String
    },
    acc_pinc: {
        type: Number,
        required: true
    },
    acc_type: {
        type: String,
        required: true
    },
    acc_adhar: {
        type: Number
    },
    acc_pan: {
        type: String
    },
    acc_gendr: {
        type: String
    },
    acc_comp: {
        type: String
    },
    acc_dept: {
        type: String
    },
    acc_desig: {
        type: String
    },
    acc_role: {
        type: String
    },
    acc_ctc: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Account', AccSchema)
