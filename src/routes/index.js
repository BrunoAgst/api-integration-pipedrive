const express = require('express')
const controller = require('../controller/index.js')
const router = express.Router()

router.post('/notification', controller.registerDeals)
router.get('/status', controller.status)
router.get('/deals', controller.consultDeals)


module.exports = router