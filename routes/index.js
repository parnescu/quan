exports.index = function(req, res){
	res.render('index.jade');
};
exports.tdd  = function(req,res){
	res.render('specrunner.jade');
}
