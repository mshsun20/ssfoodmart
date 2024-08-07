const mongoose = require('mongoose')

const CrtSchema = mongoose.Schema({
    cart_acc: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cart_store: [{
        cart_item: {
            type: mongoose.Types.ObjectId,
            ref: 'Item',
            required: true
        },
        cart_qty: {
            type: Number,
            required: true
        },
        cart_totlcost: {
            type: Number,
            required: true
        }
    }],
    cart_status: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', CrtSchema)