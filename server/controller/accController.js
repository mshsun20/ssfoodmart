const AccModel = require('../model/accModel')

module.exports = {
    create: async (req, res) => {
        const {acc_name, acc_email, acc_pass, acc_phn, acc_fname, acc_cntry, acc_state, acc_dist, acc_cty, acc_addr, acc_pinc, acc_type, acc_adhar, acc_pan, acc_gendr, acc_comp, acc_dept, acc_desig, acc_role, acc_ctc} = req.body

        try {
            const Accexst = await AccModel.findOne({$and:[{$or: [{acc_name}, {acc_email}]}, {acc_pass}]})
            if (Accexst) {
                res.json({error:`Account already Exist ...!!`, statuscode:422})
            }
            else {
                const Acc = await AccModel.create({acc_name, acc_email, acc_pass, acc_phn, acc_fname, acc_cntry, acc_state, acc_dist, acc_cty, acc_addr, acc_pinc, acc_type, acc_adhar, acc_pan, acc_gendr, acc_comp, acc_dept, acc_desig, acc_role, acc_ctc})
                if (Acc) {
                    res.json({success:`Account created successfully.`, statuscode:220, data:Acc})
                }
                else {
                    res.json({error:`Account creation failed ...!!`, statuscode:423})
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    login: async (req, res) => {
        const {acc_id, acc_pass} = req.body

        try {
            const Acc = await AccModel.findOne({$and:[{$or: [{acc_name:acc_id}, {acc_email:acc_id}]}, {acc_pass}]})
            if (Acc) {
                res.json({success:`Admin logged in successfully.`, statuscode:220, data:Acc})
            }
            else {
                res.json({error:`Admin not found ...!!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            const Acc = await AccModel.find()
            if (Acc) {
                res.json({success:`All Accounts data fetched successfully.`, statuscode:220, data:Acc})
            }
            else {
                res.json({error:`Account data fetch error ...!!`, statuscode:422})
            }
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {},
    delete: async (req, res) => {},
}