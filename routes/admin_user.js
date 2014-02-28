
/*
 * GET users listing.
 */
var mongo = require('./mongo');

exports.adminUserList = function(req, res){
    res.render('admin/userlist');
};