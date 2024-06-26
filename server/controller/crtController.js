const CrtModel = require('../model/crtModel')
const UsrModel = require('../model/usrModel')
const ItmModel = require('../model/itmModel')
const Client = require('../Client')
const { populate } = require('dotenv')
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_STAGE)

module.exports = {
    create: async (req, res) => {
        // console.log(req.body)
        const {user, item, quantity, totalCost} = req.body
        // console.log(item)

        try {
            const Usrexst = await CrtModel.findOne({cart_acc:user._id})
            // console.log(Usrexst)
            if (Usrexst) {
                if (Usrexst !== null) {
                    const Crt = await CrtModel.updateOne({cart_acc:user._id, cart_status:'Active'}, {$push:{cart_store:{cart_item:item._id, cart_qty:quantity, cart_totlcost:totalCost}}}, {new:true})
                    if (Crt) {
                        res.json({success:`Item added to existing Cart.`, statuscode:220, data:Crt})
                    }
                    else {
                        res.json({error:`Item add to Cart failed...!`, statuscode:423})
                    }
                }
                else {
                    const Crt = await CrtModel.insertMany({cart_acc:user._id, cart_store:[{cart_item:item._id, cart_qty:quantity, cart_totlcost:totalCost}], cart_status:'Active'})
                    if (Crt) {
                        res.json({success:`Cart data created successfully.`, statuscode:220, data:Crt})
                    }
                    else {
                        res.json({error:`Cart data creation failed...!`, statuscode:423})
                    }
                }
            }
            else {
                const Crt = await CrtModel.create({cart_acc:user._id, cart_store:[{cart_item:item._id, cart_qty:quantity, cart_totlcost:totalCost}], cart_status:'Active'})
                if (Crt) {
                    res.json({success:`Cart data created successfully.`, statuscode:220, data:Crt})
                }
                else {
                    res.json({error:`Cart data creation failed...!`, statuscode:423})
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    checkout: async (req, res) => {
        const {products} = req.body
        // console.log(products)

        try {
            const lineItems = products.map((product)=>({
                price_data: {
                    currency:"inr",
                    product_data:{
                        name:product.cart_item.item_name,
                        images:[product.cart_item.item_image]
                    },
                    unit_amount:product.cart_item.item_price * 100,
                },
                quantity:product.cart_qty
            }))
            // console.log(lineItems)

            const session = await stripe.checkout.sessions.create({
                payment_method_types:["card"],
                line_items:lineItems,
                mode:"payment",
                success_url:`${Client}/success`,
                cancel_url:`${Client}/cancel`,
            });

            res.json({id:session.id})
        } catch (error) {
            console.error(error)
        }
    },
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            const Crt = await CrtModel.find().populate({path:'cart_acc'}).populate({path:'cart_store', populate:{path:'cart_item'}})
            if (Crt) {
                res.json({message:`All Cart data fetched successfully.`, statuscode:220, data:Crt})
            }
            else {
                res.json({message:`No Cart data found ...!!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    readbyid: async (req, res) => {
        const crtid = req.params.id

        try {
            const Crt = await CrtModel.findOne({_id:crtid}).populate({path:'cart_acc'}).populate({path:'cart_store', populate:{path:'cart_item'}})
            if (Crt) {
                res.json({message:`Cart data fetched successfully.`, statuscode:220, data:Crt})
            }
            else {
                res.json({message:`No Cart data found ...!!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    readitm: async (req, res) => {
        const crtitmid = req.params.id

        try {
            const Crtexst = await CrtModel.find().populate({path:'cart_acc'}).populate({path:'cart_store', populate:[{path:'cart_item'}]})
            const Crtdta = await Crtexst.filter((elm) => {
                const itmd = elm.cart_store.filter(el => String(el._id) === String(crtitmid))
                return (itmd.length > 0)&&(itmd)
            })
            // console.log(Crtdta)

            if (Crtdta) {
                res.json({message:`Cart Item details fetched successfully.`, statuscode:220, data:Crtdta[0]})
            }
            else {
                res.json({message:`No Cart Item found ...!!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {
        const itmnm = req.params.id
        // console.log(itmnm)
        // console.log(req.body)
        const {user, item, quantity, totalCost} = req.body

        try {
            const Usrexst = await CrtModel.findOne({cart_acc:user._id})
            if (Usrexst) {
                const Crtexst = await CrtModel.find().populate({path:'cart_store', populate:[{path:'cart_item', match:{item_name:itmnm}}]}).populate({path:'cart_acc', match:{_id:user._id}})
                const Crtdta = await Crtexst.filter(elm => elm.cart_acc !== null)
                // console.log(Crtdta)
                if (Crtexst) {
                    const Crt = await CrtModel.updateOne({cart_acc:user._id}, {$set:{'cart_store.$[el].cart_qty':quantity,'cart_store.$[el].cart_totlcost':totalCost}}, {arrayFilters:[{'el.cart_item':item._id}]}, {new:true})
                    // console.log(Crt)
                    if (Crt) {
                        res.json({success:`Cart Updated Successfully..!`, statuscode:220, data:Crt})
                    }
                    else {
                        res.json({error:`Cart Update Failed ..!`, statuscode:422})
                    }
                }
                else {
                    res.json({error:`Cart Item Not Exist ..!`, statuscode:423})
                }
            }
            else {
                res.json({error:`Cart data Not Exist ..!`, statuscode:424})
            }
        } catch (error) {
            console.error(error)
        }
    },
    delete: async (req, res) => {
        const itmcode = req.params.id
        // console.log(itmcode)

        try {
            const Crtexst = await CrtModel.find().populate({path:'cart_item', match:{item_code:itmcode}})
            const Crtdta = await Crtexst.filter(elm => elm.cart_item !== null)

            if (Crtdta) {
                const Crt = await CrtModel.deleteOne({_id:Crtdta[0]._id})
                if (Crt) {
                    res.json({success:`Cart Deleted Successfully..!`, statuscode:220, data:Crt})
                }
                else {
                    res.json({error:`Cart Delete Failed..!`, statuscode:422})
                }
            }
            else {
                res.json({error:`Cart data Not Exist ..!`, statuscode:423})
            }
        } catch (error) {
            res.json({error:`Cart data removal failed ...!`})
        }
    },
    dltall: async (req, res) => {
        try {
            const Crtstat = await CrtModel.deleteMany()
            if (Crtstat) {
                res.json({success:`All Cart details Removed Successfully.`, statuscode:220, data:Crtstat})
            }
            else {
                res.json({error:`All Winner details Removal Failed ...!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    }
}