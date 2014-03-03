/**
 * Created by cz on 14-3-5.
 */

var mongo = require('./mongo');



exports.getKindList = function(req,res){
    var kindModel = mongo.kindModel('kind');
    kindModel.find(function(error,kinds){
        if(error) console.log(error);
        res.send(kinds);
    });
}