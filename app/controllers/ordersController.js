const {searchOrd} = require('./puppeterController');

module.exports = {
    
    processOrders : function(req,res){
        let order = req.body;
        res.json(req.body).status(200)

        searchOrd(order);
    }
    
}