const CntrymModel = require('../../../model/masters/locm/cntrymModel')

module.exports = {
    create: async (req, res) => {
        const {cntry_name, cntry_code, cntry_info} = req.body

        try {
            const Cntryexst = await CntrymModel.findOne({cntry_name})
            if (Cntryexst) {
                res.json({message:`Country already exists ...!`, statuscode:422, data:Cntryexst})
            }
            else {
                const Cntry = await CntrymModel.create({cntry_name, cntry_code, cntry_info})
                if (Cntry) {
                    res.json({message:`Country data added successfully.`, statuscode:220, data:Cntry})
                }
                else {
                    res.json({message:`Country add failed ...!`, statuscode:423})
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            const Cntry = await CntrymModel.find()
            res.json({message:`All Districts ata fetched successfully`, statuscode:220, data:Cntry})
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {},
    delete: async (req, res) => {},
}