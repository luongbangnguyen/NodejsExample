var homeController = require('../controllers/homeController');
module.exports = function(app){
	app.get('/', homeController.index);
	app.get('/:page([0-9]{1,9})', homeController.index);
}
