const DstrctmModel = require('../../../model/masters/locm/dstrctmModel')

module.exports = {
    create: async (req, res) => {
        const {dstrct_name, dstrct_info, stt} = req.body

        try {
            const Dstrctexst = await DstrctmModel.findOne({$and:[{dstrct_name}, {stt}]})
            if (Dstrctexst) {
                res.json({message:`District already exists ...!`, statuscode:422, data:Dstrctexst})
            }
            else {
                const Dstrct = await DstrctmModel.create({dstrct_name, dstrct_info, stt})
                if (Dstrct) {
                    res.json({message:`District data added successfully.`, statuscode:220, data:Dstrct})
                }
                else {
                    res.json({message:`District add failed ...!`, statuscode:423})
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            const Dstrct = await DstrctmModel.find().populate({path:'stt', populate:[{path:'cntry'}]})
            res.json({message:`All Districts ata fetched successfully`, statuscode:220, data:Dstrct})
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {},
    delete: async (req, res) => {},
}