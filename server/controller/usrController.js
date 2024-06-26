const UsrModel = require('../model/usrModel')
const { update } = require('./accController')

module.exports = {
    create: async (req, res) => {
        const {user_name, user_email, user_pass, user_phn, user_fname, user_cntry, user_state, user_dist, user_cty, user_addr, user_pinc} = req.body

        try {
            const Usrexst = await UsrModel.findOne({$and:[{$or: [{user_name}, {user_email}]}, {user_pass}]})
            if (Usrexst) {
                res.json({error:`User already Exist`, statuscode:422, data:Usrexst})
            }
            else {
                console.log(req.body)
                const Usr = await UsrModel.create({user_name, user_email, user_pass, user_phn, user_fname, user_cntry, user_state, user_dist, user_cty, user_addr, user_pinc})
                if (Usr) {
                    res.json({success:`User created successfully.`, statuscode:220, data:Usr})
                }
                else {
                    res.json({error:`User creation failed ...!!`, statuscode:423})
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    login: async (req, res) => {
        const {user_acc, user_pass} = req.body

        try {
            // const Usr = await UsrModel.findOne({$or:[{user_name:user_acc}, {user_email:user_acc}], $and:[{user_pass}]})
            const Usr = await UsrModel.findOne({$and:[{$or: [{user_name:user_acc}, {user_email:user_acc}]}, {user_pass}]})
            if (Usr) {
                res.json({success:`User logged in successfully.`, statuscode:220, data:Usr})
            }
            else {
                res.json({error:`User not found ...!!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    session: async (req, res) => {},
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            const Usr = await UsrModel.find()
            if (Usr) {
                res.json({success:`All Users data successfully.`, statuscode:220, data:Usr})
            }
            else {
                res.json({error:`User data not found ...!!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {},
    delete: async (req, res) => {},
}

// user_name, user_email, user_pass, user_phn, user_fname, user_cntry, user_state, user_dist, user_cty, user_addr, user_pinc