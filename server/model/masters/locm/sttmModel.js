const mongoose = require('mongoose')

const SttmSchema = mongoose.Schema({
    stt_code: {
        type: Number,
        required: true,
        unique: true
    },
    stt_name: {
        type: String,
        required: true,
        unique: true
    },
    stt_info: {
        type: String
    },
    cntry: {
        type: mongoose.Types.ObjectId,
        ref: 'Country',
        required: true
    }
})

module.exports = mongoose.model('State', SttmSchema)