const express = require('express')
const router = express.Router()
const ItmController = require('../controller/itmController')
const CrtController = require('../controller/crtController')
const UsrController = require('../controller/usrController')
const AccController = require('../controller/accController')
const CntrymController = require('../controller/masters/locm/cntrymController')
const SttmController = require('../controller/masters/locm/sttmController')
const DstrctmController = require('../controller/masters/locm/dstrctmController')




// LIVE STATUS CHECK
router.route('/').get((req, res) => {
    res.json({message:`Server is Live...`, statuscode:200})
})



// CREATE
router.route('/account/add').post(AccController.create)
router.route('/account/login').post(AccController.login)
router.route('/user/add').post(UsrController.create)
router.route('/user/login').post(UsrController.login)
router.route('/item/add').post(ItmController.create)
router.route('/cart/add').post(CrtController.create)
router.route('/cart/checkout').post(CrtController.checkout)
router.route('/masters/locm/cntrym/add').post(CntrymController.create)
router.route('/masters/locm/sttm/add').post(SttmController.create)
router.route('/masters/locm/dstrctm/add').post(DstrctmController.create)


// READ
router.route('/account/fetch').get(AccController.read)
router.route('/user/fetch').get(UsrController.read)
router.route('/item/fetch').get(ItmController.read)
router.route('/item/fetchbyid/:id').get(ItmController.readbyid)
router.route('/item/fetchbyname/:name').get(ItmController.readbyname)
router.route('/item/image/fetch/:id').get(ItmController.fetchimg)
router.route('/cart/fetch').get(CrtController.read)
router.route('/cart/fetch/:id').get(CrtController.readbyid)
router.route('/cartitm/fetch/:id').get(CrtController.readitm)
router.route('/cartitm/fetch/:id').get(CrtController.readitm)
router.route('/masters/locm/cntrym/fetch').get(CntrymController.read)
router.route('/masters/locm/sttm/fetch').get(SttmController.read)
router.route('/masters/locm/dstrctm/fetch').get(DstrctmController.read)


// UPDATE
router.route('/account/update/:id').put(AccController.update)
router.route('/user/update/:id').put(UsrController.update)
router.route('/item/update/:id').put(ItmController.update)
router.route('/item/image/add/:id').put(ItmController.insertimg)
router.route('/cart/update/:id').put(CrtController.update)


// DELETE
router.route('/account/remove/:id').delete(AccController.delete)
router.route('/user/remove/:id').delete(UsrController.delete)
router.route('/item/remove/:id').delete(ItmController.delete)
router.route('/cart/remove/:id').delete(CrtController.delete)
router.route('/cart/removeall').delete(CrtController.dltall)





module.exports = router