const { Router } = require('express');

const { authMiddleware } = require('./middlewares/auth-middleware');

const { OfficerController } = require('./controllers/OfficerController');
const { UserController } = require('./controllers/UserController');
const { TeamController } = require('./controllers/TeamController');
const { OperationController } = require('./controllers/OperationController');
const { OfficerOperationController } = require('./controllers/OfficerOperationController');

const routes = Router();

const userController = new UserController();
const officerController = new OfficerController();
const teamController = new TeamController();
const operationController = new OperationController();
const officerOperationController = new OfficerOperationController();

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

// Operation
routes.post('/operation', authMiddleware, operationController.create);
routes.get('/operation', authMiddleware, operationController.getAll);
routes.delete('/operation/:id', authMiddleware, operationController.delete);
routes.put('/operation/:id', authMiddleware, operationController.update);

// OfficerOperation
routes.post('/officeroperation', authMiddleware, officerOperationController.create);
routes.get('/officeroperation', authMiddleware, officerOperationController.getAll);
routes.put('/officer/:ofid/operation/:oid', authMiddleware, officerOperationController.update);
routes.delete('/officer/:ofid/operation/:oid', authMiddleware, officerOperationController.delete);
routes.get('/officeroperation/officer/:ofid', authMiddleware, officerOperationController.getAllFromOfficer);
routes.get('/officeroperation/operation/:oid', authMiddleware, officerOperationController.getAllFromOperation);


module.exports = { routes };
