
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var adminlogin = require('./routes/admin_login.js');
var adminuser = require('./routes/admin_user.js');
var http = require('http');
var path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);


app.use(express.cookieParser('S3CRE7'));
app.use(express.cookieSession());
app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});
app.use(app.router);
//app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));




// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);


app.get('/admin',adminlogin.adminLoginPage);
app.post('/admin/login',adminlogin.adminLogin);
app.get('/admin/index',adminlogin.adminLoginForward);

app.get('/admin/adminuserindex',adminuser.adminUserIndex)
app.post('/admin/userlist',adminuser.adminUserList);
app.post('/admin/adduser',adminuser.adminAddUser);
app.post('/admin/deluser',adminuser.adminDelUser);
app.post('/admin/updateuser',adminuser.adminUpdateUser);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
