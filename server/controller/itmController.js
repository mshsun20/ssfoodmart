const ItmModel = require('../model/itmModel')

module.exports = {
    create: async (req, res) => {
        // console.log(req.body)
        const {item_code, item_name, item_detl, item_desc, item_image, item_type, item_price, item_rating, item_qty} = req.body

        try {
            const Itmexst = await ItmModel.findOne({$and: [{item_code}, {item_name}]})
            // console.log(Itmexst)
            if (Itmexst) {
                res.json({error:`Item Already Exist ..!`, statuscode:422})
            }
            else {
                const Itm = await ItmModel.create({item_code, item_name, item_detl, item_desc, item_album:[{item_image}], item_type, item_price, item_rating, item_qty})
                if (Itm) {
                    res.json({success:`Item Added successfully ...`, statuscode:220})
                }
                else {
                    res.json({error:`Item Addition failed ..!`, statuscode:423})
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            const Itm = await ItmModel.find()
            if (Itm) {
                res.json({success:`All Items data fetched successfully.`, statuscode:220, data:Itm})
            }
            else {
                res.json({error:`Item not found ...!!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    readbyid: async (req, res) => {
        const itmid = req.params.id

        try {
            const Itm = await ItmModel.findOne({_id:itmid})
            if (Itm) {
                res.json({success:`Item data fetched successfully.`, statuscode:220, data:Itm})
            }
            else {
                res.json({error:`Item not found ...!!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    readbyname: async (req, res) => {
        // console.log(req.params);
        const itmnm = req.params.name

        try {
            const Itm = await ItmModel.findOne({item_name:itmnm})
            if (Itm) {
                res.json({success:`Item data fetched successfully.`, statuscode:220, data:Itm})
            }
            else {
                res.json({error:`Item not found ...!!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    fetchimg: async (req, res) => {
        const itmid = req.params.id

        try {
            const Itm = await ItmModel.findOne({_id:itmid})
            if (Itm) {
                res.json({success:`Item data fetched successfully.`, statuscode:220, data:Itm})
            }
            else {
                res.json({error:`Item not found...!!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {},
    insertimg: async (req, res) => {
        const itmid = req.params.id
        const {item_image} = req.body
        // console.log(item_image)

        try {
            const Itm = await ItmModel.updateOne({_id:itmid}, {$push:{item_album:{item_image}}}, {new: true})
            if (Itm) {
                res.json({success:`Item Image Added successfully.`, statuscode:220, data:Itm})
            }
            else {
                res.json({error:`Item Image Add failed ...!!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    delete: async (req, res) => {
        const {itmid} = req.params.id

        try {
            const Itm = await ItmModel.findOneAndDelete({_id:itmid})
        } catch (error) {
            console.error(error)
        }
    },
}