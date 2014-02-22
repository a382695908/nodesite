
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('nindex', { title: 'Express' });
};