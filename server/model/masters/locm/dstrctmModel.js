const mongoose = require('mongoose')

const DstrctmSchema = mongoose.Schema({
    dstrct_name: {
        type: Number,
        required: true
    },
    dstrct_info: {
        type: String
    },
    stt: {
        type: mongoose.Types.ObjectId,
        ref: 'State',
        required: true
    }
})

module.exports = mongoose.model('District', DstrctmSchema)