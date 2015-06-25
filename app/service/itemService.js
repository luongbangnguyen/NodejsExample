var async = require('async');
var itemModel = require('../models/Item');
itemModel.getAllItems = function getAllItems(skip, limit, callback){
	var items = {
    	currentPage: 1,
        totalPages: 0,
        numberOfPages: 5,
        data : []
    };

	async.parallel([
		function(next){
			var query = itemModel.find()
            	.skip(skip*limit).limit(limit)
            	.sort([['_id', 'descending']]);

            query.exec(function(err,result){
				items.data = result;
				 next();
            });
		},
		function(next){
			var query = itemModel.find();
			query.count(function(err, result){
				items.totalPages = result % limit == 0 ? parseInt(result / limit) : parseInt(result / limit) + 1;
				next();
			});
		}
	],function(){
		items.currentPage = (skip + 1);
        items.numberOfPages =  limit;
		callback(items);
	});
}
itemModel.getItemById = function(id, callback){
  var query = itemModel.findById(id);
  query.exec(function(err, result){
    callback(result);
  });
}
itemModel.updateItemById = function(id, itemUpdate, callback){
  var query = {_id : id};
  itemModel.update(query, itemUpdate,function(err,result){
    if(err){
      console.log(err);
    }else{
      callback(result);
    }
  });
}
itemModel.deleteItem = function(id, callback){
  itemModel.findByIdAndRemove(id, function(err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
      callback(result);
    }
  });
}
module.exports = itemModel;