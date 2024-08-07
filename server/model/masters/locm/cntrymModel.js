const mongoose = require('mongoose')

const CntrymSchema = mongoose.Schema({
    cntry_name: {
        type: String,
        required: true,
        unique: true
    },
    cntry_code: {
        type: String
    },
    cntry_info: {
        type: String
    }
})

module.exports = mongoose.model('Country', CntrymSchema)