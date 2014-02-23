/**
 * Created by cz on 14-2-22.
 */

var mongo = require('./mongo');

exports.adminlogin = function(req, res){
    var username = req.param('username');
    var pwd = req.param('pwd');
    var userModel = mongo.userModel('user');
    userModel.count({username:username,pwd:pwd},function(error, result){
        if(error) {
            console.log(error);
        } else {
           if(result === 1){
               res.render('admin/index',{username:username,pwd:pwd});
           }else{
               res.render('admin/login',{username:username,pwd:pwd});
           }
        }

    });
};

exports.forwad = function(req, res){
    res.render('admin/login');
};

