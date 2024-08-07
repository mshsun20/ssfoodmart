const mongoose = require('mongoose')

const UsrSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_pass: {
        type: String,
        required: true
    },
    user_phn: {
        type: Number
    },
    user_fname: {
        type: String,
        required: true
    },
    user_cntry: {
        type: String,
        required: true
    },
    user_state: {
        type: String
    },
    user_dist: {
        type: String
    },
    user_cty: {
        type: String
    },
    user_addr: {
        type: String,
        required: true
    },
    user_pinc: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UsrSchema)