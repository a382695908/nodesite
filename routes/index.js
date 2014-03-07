
/*
 * GET home page.
 */

var mongo = require('./mongo');

exports.index = function(req, res){
  var productModel = mongo.productModel("product");
  productModel.find(function(err,products){
      if(err) console.error(err);
      res.render('index',{products:products,title:'i lik you'});
  })
};