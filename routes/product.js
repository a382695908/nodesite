
/*
 * GET users listing.
 */
var mongo = require('./mongo');

exports.productDetail = function(req,res){
    var id =  req.param('id');
    var productModel = mongo.productModel('product');
    productModel.findById(id,function(error,product){
        if(error) console.error(error);
        var outHtml = '<img src="'+ product.pic + '"/>';
        res.send(outHtml);
    })
}

