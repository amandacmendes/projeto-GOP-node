const { Router } = require('express');

/*
const signupUserController = require('./controllers/user/signup-user-controller');
const signinUserController = require('./controllers/user/signin-user-controller');
const createNutritionistController = require('./controllers/nutritionist/create-nutritionist-controller');
const readAllNutritionistController = require('./controllers/nutritionist/read-all-nutritionist-controller');
*/

const { authMiddleware } = require('./middlewares/auth-middleware');
const { OfficerController } = require('./controllers/OfficerController');
const { UserController } = require('./controllers/UserController');

const routes = Router();

// Users
routes.post('/user/signup', UserController.register);
routes.post('/user/signin', UserController.login);

// Officer
routes.post('/officer', authMiddleware, OfficerController.create);
routes.get('/officer', authMiddleware, OfficerController.getAll);

/*
// Nutritionist
routes.post('/nutritionist', authMiddleware, createNutritionistController.create);
routes.get('/nutritionist', authMiddleware, readAllNutritionistController.getAll);
*/

module.exports = { routes };
