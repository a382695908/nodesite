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
            if(result === 0){
                res.send({login:0});
            }else if(result ===1 ){
                req.session.logininfo = {username:username,pwd:pwd};
                res.locals.session = req.session
                res.send({login:1});
            }
        }
    });
};

exports.forwad = function(req, res){
    res.render('admin/login');
};

exports.index = function(req, res){
    res.render('admin/index');
};

