
/*
 * GET users listing.
 */
var mongo = require('./mongo');



exports.adminKindIndex = function(req,res){
    res.render("admin/kindlist");
}

exports.adminKindList = function(req, res){
    var kindModel = mongo.kindModel('kind');
    kindModel.count(function (err, count){
        if(count === 0){
            res.send({"total":0,"rows":[]});
        }else{
            var page = req.param('page');
            var rows = req.param('rows');
            kindModel.find(null,null,{skip:(page-1)*rows,limit:rows},function(error,result){
                if(error) console.log(error);
                res.send({"total":count,"rows":result});
            })
        }
    });
};

exports.adminAddKind = function(req,res){
    var kindModel = mongo.kindModel('kind');
    kindModel.create({name:req.param('name')},function(error,result){
        if(error){
            console.log(error)
        }
        res.send(result);
    })
}

exports.adminDelKind = function(req,res){
    var kindModel = mongo.kindModel('kind');
    kindModel.remove({_id:req.param('id')},function(error){
        if(error) {
            console.log(error);
            res.send({"success":true});
        }else{
            res.send({"success":false});
        }
    })
}


exports.adminUpdateKind = function(req,res){
    var kindModel = mongo.kindModel('kind');
    kindModel.findByIdAndUpdate(req.param('id'),{name:req.param('name')},function(error,result){
        if(error) {
            console.log(error);
        }else{
            res.send(result);
        }
    })
}

