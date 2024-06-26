const mongoose = require('mongoose')

const ItmSchema = mongoose.Schema({
    item_code:{
        type: Number,
        required: true,
        unique: true
    },
    item_name: {
        type: String,
        required: true,
        unique: true
    },
    item_detl: {
        type: String,
        required: true
    },
    item_desc: {
        type: String
    },
    item_album: [{
        item_image: {
            type: String,
            required: true
        },
    }],
    item_type: {
        type: String
    },
    item_price: {
        type: Number,
        required: true
    },
    item_rating: {
        type: Number
    },
    item_qty: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Item', ItmSchema)