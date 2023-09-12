const { Router } = require('express');

const { authMiddleware } = require('./middlewares/auth-middleware');

const { OfficerController } = require('./controllers/OfficerController');
const { UserController } = require('./controllers/UserController');
const { TeamController } = require('./controllers/TeamController');

const routes = Router();

const userController = new UserController();
const officerController = new OfficerController();
const teamController = new TeamController();

// Users
routes.post('/signup', userController.signup);
routes.post('/signin', userController.signin);

// Officer
routes.post('/officer', authMiddleware, officerController.create);
routes.get('/officer', authMiddleware, officerController.getAll);
routes.delete('/officer/:id', authMiddleware, officerController.delete);
routes.put('/officer/:id', authMiddleware, officerController.update);

// Team
routes.post('/team', authMiddleware, teamController.create);
routes.get('/team', authMiddleware, teamController.getAll);
routes.delete('/team/:id', authMiddleware, teamController.delete);
routes.put('/team/:id', authMiddleware, teamController.update);



module.exports = { routes };
