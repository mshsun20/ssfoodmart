const SttmModel = require('../../../model/masters/locm/sttmModel')

module.exports = {
    create: async (req, res) => {
        const {stt_code, stt_name, stt_info, cntry} = req.body
        // console.log(req.body)

        try {
            const Sttexst = await SttmModel.findOne({$or:[{stt_code}, {stt_name}]})
            if (Sttexst) {
                res.json({message:`State already exists ...!`, statuscode:422, data:Sttexst})
            }
            else {
                const Stt = await SttmModel.create({stt_code:parseInt(stt_code), stt_name, stt_info, cntry})
                if (Stt) {
                    res.json({message:`State data added successfully.`, statuscode:220, data:Stt})
                }
                else {
                    res.json({message:`State add failed ...!`, statuscode:423})
                }
            }
        } catch (error) {
            console.error(error)
        }
    },
    upload: async (req, res) => {},
    read: async (req, res) => {
        try {
            const Stt = await SttmModel.find().populate({path:'cntry'})
            res.json({message:`All States ata fetched successfully`, statuscode:220, data:Stt})
        } catch (error) {
            console.error(error)
        }
    },
    update: async (req, res) => {},
    delete: async (req, res) => {},
}