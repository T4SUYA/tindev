const express = require('express');
const DevController = require('./controllers/DevController');
const DataController = require ('./controllers/DataController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');
const routes = express.Router();

routes.get('/devs',DevController.index);
routes.get('/devData',DataController.UserData);
routes.post('/devs', DevController.store);
routes.post('/devs/:DevId/likes',LikeController.store);
routes.post('/devs/:DevId/dislikes',DislikeController.store);


module.exports = routes;