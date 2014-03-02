
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
    var userModel = mongo.userModel('user');
    userModel.create({username:req.param('username'),pwd:req.param('pwd')},function(error,result){
        if(error){
            console.log(error)
        }
        res.send(result);
    })
}

exports.adminDelProduct = function(req,res){
    var userModel = mongo.userModel('user');
    userModel.remove({_id:req.param('id')},function(error){
        if(error) {
            console.log(error);
            res.send({"success":true});
        }else{
            res.send({"success":false});
        }
    })
}


exports.adminUpdateProduct = function(req,res){
    var userModel = mongo.userModel('user');
    userModel.findByIdAndUpdate(req.param('id'),{username:req.param('username'),pwd:req.param('pwd')},function(error,result){
        if(error) {
            console.log(error);
        }else{
            res.send(result);
        }
    })
}

