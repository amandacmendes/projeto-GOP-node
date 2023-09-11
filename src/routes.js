const { Router } = require('express');

const signupUserController = require('./controllers/user/signup-user-controller');
const signinUserController = require('./controllers/user/signin-user-controller');
/*
const createNutritionistController = require('./controllers/nutritionist/create-nutritionist-controller');
const readAllNutritionistController = require('./controllers/nutritionist/read-all-nutritionist-controller');
*/
const { authMiddleware } = require('./middlewares/auth-middleware');

const routes = Router();

// Users
routes.post('/user/signup', signupUserController.signup);
routes.post('/user/signin', signinUserController.signin);

// Nutritionist
routes.post('/nutritionist', authMiddleware, createNutritionistController.create);
routes.get('/nutritionist', authMiddleware, readAllNutritionistController.getAll);

module.exports = { routes };
