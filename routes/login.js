/**
 * Created by cz on 14-2-22.
 */

var mongo = require('./mongo');

exports.adminlogin = function(req, res){
    console.log("do login");
    var username = req.param('username');
    var pwd = req.param('pwd');
    var userModel = mongo.userModel('user');
    userModel.count({username:username,pwd:pwd},function(error, result){
        if(error) {
            console.log(error);
        } else {
            res.send({msg:'用户不存在'});
        }
    });
};

exports.forwad = function(req, res){
    res.render('admin/login');
};

