/**
 * Created by cz on 14-2-22.
 */


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ms?poolSize=20');

var Schema = mongoose.Schema;

var UserSchema = new Schema({username: String, pwd: String});

var ProductSchema = new Schema({title:String, desc:String, price:Number});

exports.userModel = function(modelName){
    return mongoose.model(modelName, UserSchema);
}

exports.productModel = function(modelName){
    return mongoose.model(modelName, ProductSchema);
}