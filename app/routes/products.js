const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController')
const cors = require('cors');
const { corsOptions }= require('../configs/cors');
// Cors allows to receive requests from permitted urls only; 
// so I check this req url in themisto, to allow only validated users on Ganymede app.
router.post('/process', cors(corsOptions), ordersController.processOrders);



module.exports = router;