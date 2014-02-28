
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
        console.log(count)
        if(count === 0){
            res.send({"total":0,"rows":[]});
        }else{
             var page = req.param('page');
             var rows = req.param('rows');
             userModel.find(null,null,{skip:(page-1)*rows,limit:rows},function(error,result){
                 res.send({"total":count,"rows":result});
             })
        }
    });
};