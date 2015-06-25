exports.index = function(req, res){
	var meta = res.config.application;
	meta.title = "index";
	var data = {
		meta : meta,
		title : 'index'
	}
	res.render('index', data);
}