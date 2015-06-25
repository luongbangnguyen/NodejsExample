var itemController = require('../controllers/itemController');
module.exports= function(app){
	//list items
	app.get('/items',itemController.getItems);
	
	//get a item
	app.get('/item/add',itemController.addItem);
	app.get('/item/:id',itemController.addItem);

	//add new item
	app.post('/item/add',itemController.save);

	//delete item
	app.post('/item/delete/:id',itemController.delete);
}


