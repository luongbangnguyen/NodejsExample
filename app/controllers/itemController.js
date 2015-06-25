var common = require('../common/applicationCommon');
var itemService = require('../service/itemService');
var async = require('async');

//save item
exports.save = function(req, res){
	var data = setTitleItem(req,res);
    if(req.body.itemId != ''){
      updateItem(req, res);
    }else{
      saveItem(req,res);
    }
}

//view a item
exports.addItem = function(req, res){
	var data = setTitleItem(req,res);
	setReadonly(req, data);
	if(req.params.id){
	  viewItemById(res,data,req.params.id);
	}else{
	  itemEmpty = initItemEmpty();
      data.item = itemEmpty;
      res.render('item/add',data);
	}
}

//get list items
exports.getItems = function(req, res){
	var data = setTitleItems(req,res);
	var page = req.query.page || 0;
	var page_ = page <= 0 ? 0 : (page - 1);
	itemService.getAllItems(page_,5,function(result){
		data.items = result;
		res.render('item/list',data);
	});
}
exports.delete = function(req, res){
  var id = req.params.id;
  itemService.deleteItem(id,function(result){
    res.end('ok');
  });
}
function updateItem(req,res){
  var itemFromReq = parserItem(req);
  itemService.updateItemById(req.body.itemId,itemFromReq,function(result){
    res.redirect("/items");
  });
}
function initItemEmpty(){
  var item = {};
  item.title = '';
  item.link = '';
  item.image = '';
  item.contentSnippet = '';
  item.content = '';
  item.author = '';
  item._id = '';
  return item;
}

function viewItemById(res,data,id){
  	  itemService.getItemById(id,function(result){
        data.item = result;
        res.render('item/add',data);
   });

}

function setReadonly(req, data){
   var readonly = false;
   var display = 'block';
   if(req.query.readonly){
      readonly = req.query.readonly == 'false' ? 'false' : 'true';
      display = readonly == 'false' ? 'block' : 'none';
    }
   data.readonly = readonly;
   data.display = display;
}

function saveItem(req,res){
	var item = getItemFromRequest(req);
	item.save(function(err, result){
		if(err){
			console.log(err);
		}else{
			res.redirect('/items');
		}
	});
}
function getItemFromRequest(req){
    var itemFromReq = parserItem(req);
	var item = new itemService({title : itemFromReq.title,
			link : itemFromReq.link,
			image : itemFromReq.image,
			contentSnippet : itemFromReq.contentSnippet,
			content : itemFromReq.content,
			author : itemFromReq.author});
	return item;
}
function parserItem(req){
  var item = {};
  var title = req.body.title || '';
  var link = req.body.link || '';
  var image = req.body.image || '';
  var contentSnippet = req.body.contentSnippet || '';
  var content = req.body.content || '';
  var author = req.body.author || '';

  item.title = title;
  item.link = link;
  item.image = image;
  item.contentSnippet = contentSnippet;
  item.content = content;
  item.author = author;

  return item;

}
function setTitleItem(req,res){
	return common.setTitle(req,res,"Item");
}
function setTitleItems(req,res){
	return common.setTitle(req,res,"List Item");
}