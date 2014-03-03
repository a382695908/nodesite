
/*
 * GET users listing.
 */
var mongo = require('./mongo');


exports.adminProductIndex = function(req,res){
    res.render("admin/productlist");
}

exports.adminProductList = function(req, res){
    var productModel = mongo.productModel('product');
    productModel.count(function (err, count){
        if(count === 0){
            res.send({"total":0,"rows":[]});
        }else{
            var page = req.param('page');
            var rows = req.param('rows');
            productModel.find(null,null,{skip:(page-1)*rows,limit:rows},function(error,result){
                if(error) console.log(error);
                res.send({"total":count,"rows":result});
            })
        }
    });
};

exports.adminAddProduct = function(req,res){
    var productModel = mongo.productModel('product');
    productModel.create({title:req.param('title'),desc:req.param('desc'),price:req.param('price')},function(error,result){
        if(error){
            console.log(error);
            res.send({sucess:false})
        }
        res.send({sucess:true});
    })
}

exports.adminDelProduct = function(req,res){
    var productModel = mongo.productModel('product');
    productModel.remove({_id:req.param('id')},function(error){
        if(error) {
            console.log(error);
            res.send({"success":false});
        }else{
            res.send({"success":true});
        }
    })
}


exports.adminUpdateProduct = function(req,res){
    var productModel = mongo.productModel('product');
    productModel.update({_id:req.param('id')},{title:req.param('title'),desc:req.param('desc'),price:req.param('price')},function(error,result){
        if(error) {
            console.log(error);
            res.send({sucess:false})
        }else{
            res.send({sucess:true})
        }
    })
}

