
/*
 * GET users listing.
 */
var mongo = require('./mongo');


exports.adminUserIndex = function(req,res){
    res.render("admin/userlist");
}

exports.adminUserList = function(req, res){
    var userModel = mongo.userModel('user');
    userModel.count(function (err, count){
        if(count === 0){
            res.send({"total":0,"rows":[]});
        }else{
             var page = req.param('page');
             var rows = req.param('rows');
             userModel.find(null,null,{skip:(page-1)*rows,limit:rows},function(error,result){
                 if(error) console.log(error);
                 res.send({"total":count,"rows":result});
             })
        }
    });
};

exports.adminAddUser = function(req,res){
    var userModel = mongo.userModel('user');
    userModel.create({username:req.param('username'),pwd:req.param('pwd')},function(error,result){
        if(error){
            console.log(error)
        }
        res.send(result);
    })
}

exports.adminDelUser = function(req,res){
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


exports.adminUpdateUser = function(req,res){
    var userModel = mongo.userModel('user');

    userModel.findByIdAndUpdate(req.param('_id'),{username:req.param('username'),pwd:req.param('pwd')},function(error,result){
        if(error) {
            console.log(error);
        }else{
            res.send(result);
        }
    })

}

