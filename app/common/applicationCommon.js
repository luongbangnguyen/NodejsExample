var common = {};
common.setTitle = function(req,res, title){
	var meta = res.config.application;
	meta.title = title;
	var data = {
		meta : meta,
		title : title
	}
	return data;
}
module.exports = common;