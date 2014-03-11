
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var adminlogin = require('./routes/admin_login.js');
var adminuser = require('./routes/admin_user.js');
var adminproduct = require('./routes/admin_product.js');
var adminkind = require('./routes/admin_kind.js');


var kind = require('./routes/kind.js');
var product = require('./routes/product.js');

var http = require('http');
var path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 80);
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
app.use(express.static(path.join(__dirname, 'public')));




// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);


app.get('/admin',adminlogin.adminLoginPage);
app.post('/admin/login',adminlogin.adminLogin);
app.get('/admin/index',adminlogin.adminLoginForward);

app.get('/admin/userindex',adminuser.adminUserIndex)
app.post('/admin/userlist',adminuser.adminUserList);
app.post('/admin/adduser',adminuser.adminAddUser);
app.post('/admin/deluser',adminuser.adminDelUser);
app.post('/admin/updateuser',adminuser.adminUpdateUser);

app.get('/admin/productindex',adminproduct.adminProductIndex);
app.post('/admin/productlist',adminproduct.adminProductList);
app.post('/admin/addproduct',adminproduct.adminAddProduct);
app.post('/admin/delproduct',adminproduct.adminDelProduct);
app.post('/admin/updateproduct',adminproduct.adminUpdateProduct);

app.get('/admin/kindindex',adminkind.adminKindIndex);
app.post('/admin/kindlist',adminkind.adminKindList);
app.post('/admin/addkind',adminkind.adminAddKind);
app.post('/admin/delkind',adminkind.adminDelKind);
app.post('/admin/updatekind',adminkind.adminUpdateKind);
app.post("/getkindlist",kind.getKindList);


app.get("/productdetail",product.productDetail);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
