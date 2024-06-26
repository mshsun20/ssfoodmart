const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'config.env'})
const url = process.env.DB_URL_PROD

const conn = async () => {
    try {
        const result = await mongoose.connect(url, {dbName:'ssfoodmartdb'})
        if (result) {
            console.log(`DB Successfully Connected...`)
        }
    } catch (error) {
        console.error(error)
    }
}
conn()
